const router = require('express').Router();
const { Transaction, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
      user_id: req.session.user_id, 
    });
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all transactions
router.get('/', withAuth, async (req, res) => {
  try {
    console.log("Session User ID: ", req.session.user_id);

    const transactionData = await Transaction.findAll({
      where: {
        user_id: req.session.user_id,  // Filter transactions based on logged-in user
      },
      include: [User, Category],  // Including associated User and Category details
    });

    const transactions = transactionData.map((transaction) => 
      transaction.get({ plain: true })
    );

    console.log("Transactions: ", transactions); 

    res.render('transactions', {  // Render using Handlebars
      transactions,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error("Error: ", err);
    
    res.status(500).json(err);
  }
});

// Get a single transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [User, Category],  // Including associated User and Category details
    });

    if (!transaction) {
      res.status(404).json({ message: 'No transaction found with that id!' });
      return;
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTransaction) {
      res.status(404).json({ message: 'No transaction found with that id!' });
      return;
    }

    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTransaction) {
      res.status(404).json({ message: 'No transaction found with that id!' });
      return;
    }

    res.status(200).json(deletedTransaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

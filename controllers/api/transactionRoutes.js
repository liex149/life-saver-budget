const router = require('express').Router();
const { Transaction, User, Category } = require('../../models');

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
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [User, Category],  // Including associated User and Category details
    });
    res.status(200).json(transactions);
  } catch (err) {
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

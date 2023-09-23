const withAuth = require('../utils/auth');
const router = require('express').Router();
const express = require('express');
const {User, Category, Transaction} = require('../models');
const app = express()


//Redner homepage
router.get("/", async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Render Home page (graphs and stuff)
router.get('/home', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
      where: {user_id: req.session.user_id},
    });
    // Pass serialized data and session flag into template
    const categories = categoryData.map((cat) => cat.get({ plain: true}));

      res.render("home", {
        categories,
        logged_in: req.session.logged_in,
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

//Render Transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactionData = await Transaction.findAll({
      include: [User, Category],  // Including associated User and Category details
    });
    // Pass serialized data and session flag into template
    const transactions = transactionData.map((post) => post.get({ plain: true}));

      res.render("transactions", {
        transactions,
        logged_in: req.session.logged_in,
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

//Render Transactions
router.get('/logger', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
      where: {user_id: req.session.user_id},
    });
    // Pass serialized data and session flag into template
    const categories = categoryData.map((cat) => cat.get({ plain: true}));

      res.render("logger", {
        categories,
        logged_in: req.session.logged_in,
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

//post a new transaction by category
router.post("/logTransaction", withAuth, async (req, res) => {
  // add a comment. Save the user id and blogpost_id
  try {
    const transactionData = await Transaction.create({
      amount: req.body.transactionAmount,
      user_id: req.session.user_id,
      category_id: req.body.cat_id,
    });

    if (!transactionData) {
      res.status(404).json({ message: "No transactionData found with that id!" });
      return;
    }

    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Render editCategory
router.get('/editCategory', withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
      where: {user_id: req.session.user_id},
    });
    // Pass serialized data and session flag into template
    const categories = categoryData.map((cat) => cat.get({ plain: true}));

      res.render("editCategory", {
        categories,
        logged_in: req.session.logged_in,
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.all("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("login");
});


module.exports = router;
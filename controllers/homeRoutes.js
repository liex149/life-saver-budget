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
router.get('/logger', async (req, res) => {
  try {
    const transactionData = await Transaction.findAll({
      include: [User, Category],  // Including associated User and Category details
    });
    // Pass serialized data and session flag into template
    const transactions = transactionData.map((post) => post.get({ plain: true}));

      res.render("logger", {
        transactions,
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
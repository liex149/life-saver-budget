const withAuth = require('../utils/auth');
const router = require('express').Router();
const express = require('express')
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



module.exports = router;
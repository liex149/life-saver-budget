const withAuth = require("../utils/auth");
const router = require("express").Router();
const express = require("express");
const { User, Category, Transaction } = require("../models");
const app = express();
const sequelize = require("../config/connection");


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
router.get("/home", withAuth, async (req, res) => {
  try {
    const userData = await Transaction.findAll({
      //the third attribute is the same of amounts over category ID
      attributes: [
        "user_id",
        "category_id",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      group: ["category_id", "expense"],
      where: { user_id: req.session.user_id},
      //join on Category to get the names
      include: [
        {
          model: Category,
          attributes: ["category_name", "expense"],
          // where: { expense: 1},
        },
      ],
      
    });    

    // Pass serialized data and session flag into template
    const userAMTbyCategory = userData.map((cat) => cat.get({ plain: true }));

    console.log(userAMTbyCategory);

    const cd = [];
    const tamt = [];


    for (i = 0; i < userAMTbyCategory.length; i++) {
      cd.push(userAMTbyCategory[i].category.category_name);
      tamt.push(userAMTbyCategory[i].total_amount);
    }
    console.log(cd);
    console.log(tamt);
    let expenseArray = [];
    let expenseLabelArray = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    for (const transaction of userAMTbyCategory) {
      const transactionAmount = parseFloat(transaction.total_amount);
      const transactionLabel = transaction.category.category_name;
      // Check if the transaction's category is an expense
      if (transaction.category.expense) {
        totalExpenses += transactionAmount;
        expenseArray.push(transactionAmount);
        expenseLabelArray.push(transactionLabel);
      } else {

        totalIncome += transactionAmount;
        
      }
    }

    const totalRemaining = totalIncome - totalExpenses;
    totalRemaining.toFixed(2)
    res.render("home", {
      cd: cd,
      tamt: tamt,
      expenseArray: expenseArray,
      expenseLabelArray: expenseLabelArray,
      logged_in: req.session.logged_in,
      totalRemaining: totalRemaining.toFixed(2)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update your own post
router.put("/transactions/:id", withAuth, async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const transactionData = await Transaction.update({
      amount: req.body.transactionAmount,
      category_id: req.body.cat_id,
      notes: req.body.transactionNote,
    },
    {
      where: {id: req.params.id},
    }
    
    );

    if (!transactionData) {
      res.status(404).json({ message: "No blogpost found with that id!" });
      return;
    }
    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Render Transactions
router.get("/transactions", withAuth, async (req, res) => {
  try {
    console.log("Session User ID: ", req.session.user_id);
    
    const transactionData = await Transaction.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User, Category], // Including associated User and Category details
      order:[
        ['date_created', 'DESC'],
      ]
    });
    // Pass serialized data and session flag into template
    const transactions = transactionData.map((post) =>
      post.get({ plain: true })
    );

    res.render("transactions", {
      transactions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Edit/Delete Transaction
router.get("/transactions/:id", withAuth, async (req, res) => {
  try {
    const transactionData = await Transaction.findAll({
      include: { all: true, nested: true },
      where: { user_id: req.session.user_id, id: req.params.id },
    });
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
      where: { user_id: req.session.user_id},
    });

    const categories = categoryData.map((cat) => cat.get({ plain: true }));

    // Pass serialized data and session flag into template
    const transactions = transactionData.map((cat) => cat.get({ plain: true }));

    res.render("editTran", {
      transactions,
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Render Transactions
router.get("/logger", withAuth, async (req, res) => {
  try {
    const categoryDataExpense = await Category.findAll({
      include: { all: true, nested: true },
      where: { user_id: req.session.user_id, expense: true },
    });
    const categoryDataIncome = await Category.findAll({
      include: { all: true, nested: true },
      where: { user_id: req.session.user_id, expense: false },
    });

    // Pass serialized data and session flag into template
    const categoriesExpense = categoryDataExpense.map((cat) => cat.get({ plain: true }));
    const categoriesIncome = categoryDataIncome.map((cat) => cat.get({ plain: true }));

    res.render("logger", {
      categoriesExpense,
      categoriesIncome,
      logged_in: req.session.logged_in,
    });
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
      notes: req.body.transactionNote,
    });

    if (!transactionData) {
      res
        .status(404)
        .json({ message: "No transactionData found with that id!" });
      return;
    }

    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Render editCategory
router.get("/editCategory", withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
      where: { user_id: req.session.user_id },
    });
    // Pass serialized data and session flag into template
    const categories = categoryData.map((cat) => cat.get({ plain: true }));

    res.render("editCategory", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//router to new newcategory page
router.get("/newcat", withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { all: true, nested: true },
    });

    // Serialize data so the template can read it
    const categories = categoryData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("newCat", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//post new category
router.post("/newcat", withAuth, async (req, res) => {
  // create a new blogpost
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
      expense: req.body.expense,
      user_id: req.session.user_id,
    });
    if (!categoryData) {
      res.status(404).json({ message: "Couldn't create blogpost" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete Category by id
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No cateogory found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete Transaction by id
router.delete("/deletetransaction/:id", withAuth, async (req, res) => {
  try {
    const transactionData = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!transactionData) {
      res.status(404).json({ message: "No cateogory found with this id!" });
      return;
    }

    res.status(200).json(transactionData);
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

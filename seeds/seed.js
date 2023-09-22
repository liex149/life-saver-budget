const sequelize = require('../config/connection');
const { User, Transaction, Category } = require('../models');

const userData = require('./userData.json');
const transactionData = require('./transactionData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

const cats = await Category.bulkCreate(categoryData, {
  individualHooks: true,
  returning: true,
});

const trans = await Transaction.bulkCreate(transactionData, {
  individualHooks: true,
  returning: true,
});



  process.exit(0);
};
seedDatabase();

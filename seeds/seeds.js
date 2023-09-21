const sequelize = require('../config/connection');
const { User  } = require('../models');

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
seedDatabase();

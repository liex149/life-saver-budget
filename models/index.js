const User = require("./User");
const Transaction = require("./Transaction");
const Category = require("./Category");

User.hasMany(Transaction, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Category, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Transaction.belongsTo(User,{
    foreignKey: "user_id",
})

Category.belongsTo(User, {
    foreignKey: "user_id",
})

Category.hasMany(Transaction,{
    foreignKey: "category_id",
    onDelete: "CASCADE",
})

Transaction.belongsTo(Category,{
    foreignKey: "category_id",
})

module.exports = { User, Transaction, Category };

const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    type: DataTypes.TEXT,
    name: DataTypes.TEXT,
  },
  {
    tableName: "categories",
  }
);

Category.sync({ alter: true });

// Category.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Category;

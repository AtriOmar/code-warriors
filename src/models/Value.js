const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Value = sequelize.define(
  "Value",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
  },
  {
    tableName: "values",
  }
);

Value.sync({ alter: true });

// Value.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Value;

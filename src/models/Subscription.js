const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Subscription = sequelize.define(
  "Subscription",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "subscriptions",
  }
);

// Subscription.sync({ alter: true });

module.exports = Subscription;

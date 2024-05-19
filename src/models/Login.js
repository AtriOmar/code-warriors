const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Login = sequelize.define(
  "Login",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    fingerprint: DataTypes.TEXT,
  },
  {
    tableName: "logins",
  }
);

// Login.sync({ alter: true });

// Category.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Login;

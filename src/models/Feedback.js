const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Feedback = sequelize.define(
  "Feedback",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    role: DataTypes.TEXT,
    feedback: DataTypes.TEXT,
  },
  {
    tableName: "feedbacks",
  }
);

// Feedback.sync({ alter: true });

// Feedback.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Feedback;

const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Answer = sequelize.define(
  "Answer",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: DataTypes.TEXT,
  },
  {
    tableName: "answers",
  }
);

const Question = require("@/models/Question");
const User = require("@/models/User");

Question.hasMany(Answer, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Answer.belongsTo(Question, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Answer, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Answer.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Answer.sync({ alter: true });

module.exports = Answer;

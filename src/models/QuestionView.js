const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const QuestionView = sequelize.define(
  "View",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  {
    tableName: "question_views",
  }
);

const User = require("@/models/User");
const Question = require("@/models/Question");

// User.hasMany(QuestionView, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
// QuestionView.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Question.hasMany(QuestionView, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });
QuestionView.belongsTo(Question, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// QuestionView.sync({ alter: true });

module.exports = QuestionView;

const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Comment = sequelize.define(
  "Comment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: DataTypes.TEXT,
  },
  {
    tableName: "comments",
  }
);

const Question = require("@/models/Question");

Question.hasMany(Comment, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(Question, { foreignKey: "questionId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Comment.sync({ alter: true });

module.exports = Comment;

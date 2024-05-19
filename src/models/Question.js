const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Question = sequelize.define(
  "Question",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    tableName: "questions",
  }
);

import Category from "@/models/Category";
import User from "@/models/User";

Category.hasMany(Question, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Question.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Question, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Question.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Question.sync({ alter: true });

module.exports = Question;

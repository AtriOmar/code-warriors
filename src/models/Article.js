const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Article = sequelize.define(
  "Article",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    poster: DataTypes.TEXT,
  },
  {
    tableName: "articles",
  }
);

import Category from "@/models/Category";
import User from "@/models/User";

Category.hasMany(Article, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Article.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Article, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Article.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Article.sync({ alter: true });

module.exports = Article;

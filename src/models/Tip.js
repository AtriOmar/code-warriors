const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Tip = sequelize.define(
  "Tip",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
  },
  {
    tableName: "tips",
  }
);

import User from "@/models/User";
import Category from "@/models/Category";

User.hasMany(Tip, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Tip.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Category.hasMany(Tip, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Tip.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Tip.sync({ alter: true });

module.exports = Tip;

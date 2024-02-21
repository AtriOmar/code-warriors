const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const FAQ = sequelize.define(
  "FAQ",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
  },
  {
    tableName: "faq",
  }
);

import User from "@/models/User";

User.hasMany(FAQ, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
FAQ.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// FAQ.sync({ alter: true });

module.exports = FAQ;

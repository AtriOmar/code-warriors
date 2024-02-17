const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Tag = sequelize.define(
  "Tag",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: DataTypes.TEXT,
  },
  {
    tableName: "tags",
  }
);

Tag.sync({ alter: true });

// Category.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Tag;

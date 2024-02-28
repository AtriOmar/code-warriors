const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Field = sequelize.define(
  "Field",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.TEXT,
    icon: DataTypes.TEXT,
    content: DataTypes.TEXT,
  },
  {
    tableName: "fields",
  }
);

Field.sync({ alter: true });

// Field.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Field;

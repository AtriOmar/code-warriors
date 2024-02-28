const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Setting = sequelize.define(
  "Setting",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.TEXT,
    value: DataTypes.TEXT,
    required: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "settings",
  }
);

Setting.sync({ alter: true });

// Setting.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Setting;

const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Team = sequelize.define(
  "Team",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    role: DataTypes.TEXT,
  },
  {
    tableName: "team",
  }
);

Team.sync({ alter: true });

// Team.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Team;

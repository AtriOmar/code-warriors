const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Friendship = sequelize.define(
  "Friendship",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "friendships",
  }
);

import User from "@/models/User";

User.hasMany(Friendship, { as: "Friendship1", foreignKey: "userId1" });
User.hasMany(Friendship, { as: "Friendship2", foreignKey: "userId2" });

Friendship.belongsTo(User, { as: "User1", foreignKey: "userId1" });
Friendship.belongsTo(User, { as: "User2", foreignKey: "userId2" });

// Friendship.sync({ alter: true });

module.exports = Friendship;

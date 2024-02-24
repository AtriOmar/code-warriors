const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Conversation = sequelize.define(
  "Conversation",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    seen: DataTypes.TEXT,
  },
  {
    tableName: "conversations",
  }
);

const User = require("@/models/User");

User.hasMany(Conversation, { as: "Conversation1", foreignKey: "userId1" });
User.hasMany(Conversation, { as: "Conversation2", foreignKey: "userId2" });

Conversation.belongsTo(User, { as: "User1", foreignKey: "userId1" });
Conversation.belongsTo(User, { as: "User2", foreignKey: "userId2" });

// Conversation.sync({ alter: true });

// Category.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Conversation;

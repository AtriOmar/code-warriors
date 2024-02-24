const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const Message = sequelize.define(
  "Message",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: DataTypes.TEXT,
  },

  {
    tableName: "messages",
  }
);

const Conversation = require("@/models/Conversation");
const User = require("@/models/User");

Conversation.hasMany(Message, { foreignKey: "conversationId", onDelete: "CASCADE" });
Message.belongsTo(Conversation, { foreignKey: "conversationId", onDelete: "CASCADE" });

User.hasMany(Message, { foreignKey: "senderId", onDelete: "CASCADE" });
Message.belongsTo(User, { foreignKey: "senderId", onDelete: "CASCADE" });

// Message.sync({ alter: true });

// Category.update(
//   {
//     color: "#3b82f6",
//   },
//   {
//     where: {},
//   }
// );

module.exports = Message;

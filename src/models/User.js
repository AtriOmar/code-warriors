const { Model, DataTypes } = require("sequelize");

var db = require("@/lib/sequelize"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    accessId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    picture: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    resetToken: DataTypes.TEXT,
    resetTokenExpires: DataTypes.DATE,
    regTokens: { type: DataTypes.TEXT, defaultValue: "[]" },
  },
  {
    tableName: "users",
  }
);

User.sync({ alter: true });

// SubCategory.update({ categoryId: 5 }, { where: { id: { [Op.between]: [109, 115] } } });

module.exports = User;

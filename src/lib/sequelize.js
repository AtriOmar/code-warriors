var Sequelize = require("sequelize");

const host = process.env.DB_HOST,
  port = process.env.DB_PORT,
  user = process.env.DB_USER,
  password = process.env.DB_PW,
  database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const { Pool } = require("pg");
require("dotenv").config()

module.exports = new Pool({
  host: "localhost", 
  user: process.env.ROLE_NAME,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: 5432
});

const mysql = require('mysql2/promise');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool2 = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "saw1993",
  password: "1234",
  database: "mris"
});

module.exports = pool;
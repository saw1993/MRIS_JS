const mysql = require('mysql2/promise');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool2 = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

const poodl = mysql.createPool({
  host: "localhost",
  user: "saw1993",
  password: '1234',
  database: "mris"
});


const pool = mysql.createPool({
  host: "23.111.142.162",
  user: "respicar_supun",
  password: '0717257984-930531383V',
  database: "respicar_mris"
});

module.exports = pool;
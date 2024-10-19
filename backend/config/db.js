const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const createMainDBConnection = async () => {
    return await mysql.createConnection({
      host: "localhost",
      user: "saw1993",
      password: '1234',
      database: "mris"
    });
};

const createAgencyDBConnection = async (agencyDetails) => {
    return await mysql.createConnection({
        host: agencyDetails.db_host,
        user: agencyDetails.db_user,
        password: agencyDetails.db_password,
        database: agencyDetails.db_name
    });
};

module.exports = { createMainDBConnection, createAgencyDBConnection };

/*

const mysql = require('mysql2/promise');
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool2 = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

const createMainDBConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.USER_DB_NAME
    });
};


const pool = mysql.createPool({
  host: "localhost",
  user: "saw1993",
  password: '1234',
  database: "mris"
});


const pool1 = mysql.createPool({
  host: "23.111.142.162",
  user: "respicar_supun",
  password: '0717257984-930531383V',
  database: "respicar_mris"
});

module.exports = pool;

*/
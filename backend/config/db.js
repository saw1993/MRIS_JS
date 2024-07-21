const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'saw1993',
    password: '1234',
    database: 'mris'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

module.exports = db;
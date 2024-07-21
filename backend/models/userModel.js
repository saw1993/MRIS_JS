const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)';
        db.query(query, [user.username, user.email, user.password, user.role_id], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.username = ?';
        db.query(query, [username], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = User;
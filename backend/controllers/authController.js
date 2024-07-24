const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();

const register = (req, res) => {
    const { username, email, password, role_id } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ username, email, password: hashedPassword, role_id }, (err) => {
        if (err) {
            res.send('Error Occured');
        } else{
              res.send('User registered');
        }
      
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                const accessToken = jwt.sign({ username: user.email,role_name: user.role_name }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
                res.json({ accessToken });
            } else {
                res.send('Username or password incorrect');
            }
        } else {
            res.send('Username or password incorrect');
        }
    });
};

const getUserProfile = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    
    if (!token) return res.status(401).json({ message: 'Access token is missing or invalid' });

    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token is invalid or expired' });

        User.findByUsername(user.username, (err, results) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });
            if (results.length > 0) {
                return res.status(200).json({ profile: results[0] });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        });
    });
};

module.exports = { register, login , getUserProfile };
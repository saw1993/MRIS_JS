const jwt = require('jsonwebtoken');

require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
            if (err) {
                console.log(err.message)
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
        res.send(token)
    }
};

module.exports = authenticateJWT;
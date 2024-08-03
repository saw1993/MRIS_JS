const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const logger = require('../config/logger');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    logger.warn('No token provided');
    return res.status(401).send('Access denied');
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    logger.info(`Token verified for user: ${verified.userId}`);
    next();
  } catch (err) {
    logger.error(`Invalid token: ${err.message}`);
    res.status(400).send('Invalid token');
  }
};

module.exports = authenticateToken;
const { verifyToken } = require('../utils/jwtUtils');
const logger = require('../config/logger');


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    logger.warn('No token provided');
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;  // Attach user ID to request
    logger.info(`Token request verified for authMiddleware: ${decoded.toString}`);
    next();
  } catch (err) {
    logger.error(`Invalid token: ${err.message}`);
    res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;
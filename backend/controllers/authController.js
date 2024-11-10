const loginUser = require('../usecases/login/loginUser');
const verifyUserToken = require('../usecases/login/verifyUserToken');
const userRepository = require('../repositories/userRepository');
const logger = require('../config/logger');
const ResponseHandler = require('../utils/ResponseHandler');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await loginUser(email, password, userRepository);
    logger.info(`User logged in: ${email}`);
    res.header('auth-token', token);
    return ResponseHandler.success(res, { token }, 'User logged in successfully');
  } catch (error) {
    logger.warn(`Login failed: ${error.message}`);
    return ResponseHandler.fail(res, error.message, null, 400);
  }
};

const verify = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    logger.warn('No token provided');
    return ResponseHandler.fail(res, 'No token provided', null, 401);
  }

  try {
    const user = await verifyUserToken(token, userRepository);
    logger.info('User token verified');
    return ResponseHandler.success(res, user, 'User retrieved successfully');
  } catch (err) {
    logger.error(`Token verification failed: ${err.message}`);
    return ResponseHandler.fail(res, err.message, null, 401);
  }
};

module.exports = { login, verify };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET } = process.env;
const { findUserByEmail, findUserByID  ,getUserById} = require('../models/userModel');
const { generateToken , verifyToken } = require('../utils/jwtUtils');
const logger = require('../config/logger');

const createResponse = (user = "", status = "Failed", message = "") => {
  return { user, status, message };
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    logger.warn(`Login failed: User with email ${email} not found`);
    const tokenResponse = {
      token: "",
      status:"User Not Found"
    };
    return res.status(400).send(tokenResponse);
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    logger.warn(`Login failed: Incorrect password for email ${email}`);
    const tokenResponse = {
      token: "",
      status:"Invalid Password"
    };
    return res.status(400).send(tokenResponse);
  }

      const token = generateToken(user);
      logger.info(`User logged in: ${email}`);
      const tokenResponse = {
        token: token,
        status:"Success"
      };
      res.header('auth-token', token).send(tokenResponse);
};

const verify = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        logger.warn('No token provided');
        return res.status(401).send(createResponse("", "Failed", "No token Provided"));
    }

  try {
    
    const decoded = verifyToken(token);
    logger.info(`Token request verified`);

    const user = await getUserById(decoded.id);

    if (user.user_id > 0) {
      return res.status(200).send(createResponse(user, "Success", "User retrieved"));
  } else {
      return res.status(401).send(createResponse("", "Failed", "User Not Found"));
  }



  } catch (err) {
    logger.error(`Invalid token: ${err.message}`);
    return res.status(401).send(createResponse("", "Failed", "Invalid token Provided"));
  }
};




module.exports = { login , verify};
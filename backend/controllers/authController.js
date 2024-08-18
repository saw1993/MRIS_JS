const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET } = process.env;
const { findUserByEmail, findUserByID } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');
const logger = require('../config/logger');

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
  //res.header('auth-token', token).json({ token });
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
    const tokenResponse = {
      user: "",
      status:"Failed",
      message:"No token Provided"
    };
    return res.status(401).send(tokenResponse);
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    logger.info(`Token verified for user: ${verified.userId}`);

    const results = await findUserByID(verified.userId);

  if (results.user_id>0) {
      const tokenResponse = {
      user: results,
      status:"Success",
      message:"User retrieved"
    };
    return res.status(200).send(tokenResponse);
  
  } else {
    const tokenResponse = {
      user: results,
      status:"Failed",
      message:"User Not Found"
    };
    return res.status(401).send(tokenResponse);
  }



  } catch (err) {
    logger.error(`Invalid token: ${err.message}`);
    const tokenResponse = {
      user: "",
      status:"Failed",
      message:"Invaild token Provided"
    };
    return res.status(401).send(tokenResponse);
  
  }
};

module.exports = { login , verify};
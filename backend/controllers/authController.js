const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');
const logger = require('../config/logger');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    logger.warn(`Login failed: User with email ${email} not found`);
    return res.status(400).send('Email or password is wrong');
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    logger.warn(`Login failed: Incorrect password for email ${email}`);
    return res.status(400).send('Invalid password');
  }

  const token = generateToken(user);
  logger.info(`User logged in: ${email}`);
  res.header('auth-token', token).send(token);
};

const verify = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    logger.warn(`Login failed: User with email ${email} not found`);
    return res.status(400).send('Email or password is wrong');
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    logger.warn(`Login failed: Incorrect password for email ${email}`);
    return res.status(400).send('Invalid password');
  }

  const token = generateToken(user);
  logger.info(`User logged in: ${email}`);
  res.header('auth-token', token).send(token);
};

module.exports = { login , verify};
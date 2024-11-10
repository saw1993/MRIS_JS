const express = require('express');
const bcrypt = require('bcrypt');
const { getUserById } = require('../repositories/userRepository');
const logger = require('../config/logger');
const router = express.Router();

router.post('/init-user', async (req, res) => {
  try {
    const { username, email, password, role_id } = req.body;

    // Validate required fields
    if (!username || !email || !password || role_id == null) {
      logger.error('Missing required fields');
      return res.status(400).send('Missing required fields: username, email, password, and role_id are required.');
    }

    // Check if the user already exists (to avoid duplicates)
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      logger.error('User already exists');
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = { username, email, password: hashedPassword, role_id };
    const userId = await createUser(newUser);
    logger.info(`Initial user added: ${email}`);
    res.status(201).send({ userId });
  } catch (error) {
    logger.error(`Error adding initial user: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
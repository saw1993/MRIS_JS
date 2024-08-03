const bcrypt = require('bcrypt');
const { createUser, updateUser, deleteUser } = require('../models/userModel');
const logger = require('../config/logger');

const addUser = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, role_id };
    const userId = await createUser(newUser);
    logger.info(`User added: ${email}`);
    res.send({ userId });
  } catch (error) {
    logger.error(`Error adding user: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = { email, password: hashedPassword, role_id };
    await updateUser(id, updatedUser);
    logger.info(`User updated: ID ${id}`);
    res.send('User updated');
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    logger.info(`User deleted: ID ${id}`);
    res.send('User deleted');
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addUser, editUser, deleteUserById };
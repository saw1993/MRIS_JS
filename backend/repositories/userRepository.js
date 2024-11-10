// userRepository.js
const createUser = require('../usecases/user/createUser');
const deleteUser = require('../usecases/user/deleteUser');
const updateUser = require('../usecases/user/updateUser');
const getUserByEmail = require('../usecases/user/getUserByEmail');
const getUserById  = require('../usecases/user/getUserById');

const userRepository = {
  createUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  getUserById,
};

module.exports = userRepository; // Make sure this line is correct!
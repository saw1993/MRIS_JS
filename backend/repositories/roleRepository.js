// userRepository.js
const createRole = require('../usecases/role/createRole');
const getRolesForUser = require('../usecases/role/getRoleForUser');
const getRoleById  = require('../usecases/role/getRoleById');

const roleRepository = {
  createRole,
  getRoleById,
  getRolesForUser,
};

module.exports = roleRepository; // Make sure this line is correct!
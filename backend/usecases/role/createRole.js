// src/usecases/user/createUser.js
const Role = require('../../models/definedModels/Role');
const logger = require('../../config/logger');

const createRole = async (roleData) => {
    try {
        return await Role.create(roleData);
    } catch (error) {
        logger.error(`Error creating role: ${error.message}`);
        throw new Error('Error creating role');
    }
};

module.exports = createRole;
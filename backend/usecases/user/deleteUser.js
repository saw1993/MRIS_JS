// src/usecases/user/deleteUser.js
const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');

const deleteUser = async (id) => {
    try {
        await User.destroy({ where: { user_id: id } });
    } catch (error) {
        logger.error(`Error deleting user with ID ${id}: ${error.message}`);
        throw error;
    }
};

module.exports = deleteUser;
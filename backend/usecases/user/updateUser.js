// src/usecases/user/updateUser.js
const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');

const updateUser = async (id, userData) => {
    try {
        await User.update(userData, { where: { user_id: id } });
    } catch (error) {
        logger.error(`Error updating user with ID ${id}: ${error.message}`);
        throw error;
    }
};

module.exports = updateUser;
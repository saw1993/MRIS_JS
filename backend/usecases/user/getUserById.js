// src/usecases/user/getUserById.js
const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        logger.error(`Error fetching user by ID ${userId}: ${error.message}`);
        throw error;
    }
};

module.exports = getUserById;
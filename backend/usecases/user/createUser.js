// src/usecases/user/createUser.js
const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user.user_id; // Return the new user's ID
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        throw error;
    }
};

module.exports = createUser;
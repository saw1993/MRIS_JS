    const User = require('../../models/definedModels/User');
    const logger = require('../../config/logger');

    const getUserByEmail = async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            logger.error(`Error finding user by email ${email}: ${error.message}`);
            throw error;
        }
    };

    module.exports = getUserByEmail;
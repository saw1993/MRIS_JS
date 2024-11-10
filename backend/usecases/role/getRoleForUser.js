const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');

const getRolesForUser = async (userId) => {
    try {
        return await Role.findAll({
            include: { model: User, where: { userId } }
        });
    } catch (error) {
        logger.error(`Error fetching roles for user ${userId}: ${error.message}`);
        throw new Error('Error fetching roles for user');
    }
};

module.exports = getRolesForUser;
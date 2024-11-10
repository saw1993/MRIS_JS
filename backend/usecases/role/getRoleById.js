const Role = require('../../models/definedModels/Role');
const logger = require('../../config/logger');

const getRoleById = async (roleId) => {
    try {
        return await Role.findByPk(roleId);
    } catch (error) {
        logger.error(`Error fetching role by ID ${roleId}: ${error.message}`);
        throw new Error('Error fetching role');

    }
};

module.exports = getRoleById;
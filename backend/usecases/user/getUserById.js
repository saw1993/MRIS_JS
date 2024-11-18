// src/usecases/user/getUserById.js
const User = require('../../models/definedModels/User');
const logger = require('../../config/logger');
const UserHierarchy = require('../../models/definedModels/UserHierarchy')

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ where: { user_id:userId },include: [
            {
              model: UserHierarchy,
              as: 'user_hierarchy',
              attributes: ['role_id', 'manager_id'], // Specify attributes to fetch from DoctorSpeciality table
            }
          ], });
        return user;
    } catch (error) {
        logger.error(`Error fetching user by ID ${userId}: ${error.message}`);
        throw error;
    }
};

module.exports = getUserById;
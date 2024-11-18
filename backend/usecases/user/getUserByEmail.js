    const User = require('../../models/definedModels/User');
    const logger = require('../../config/logger');
    const UserHierarchy = require('../../models/definedModels/UserHierarchy')

    const getUserByEmail = async (email) => {
        try {
            const user = await User.findOne({ where: { email },include: [
                {
                  model: UserHierarchy,
                  as: 'user_hierarchy',
                  attributes: ['role_id', 'manager_id'], // Specify attributes to fetch from DoctorSpeciality table
                }
              ], });
            return user;
        } catch (error) {
            logger.error(`Error finding user by email ${email}: ${error.message}`);
            throw error;
        }
    };

    module.exports = getUserByEmail;
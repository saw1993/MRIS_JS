// src/middleware/checkPermissionMiddleware.js
const userRepository = require('../repositories/userRepository');
const roleRepository = require('../repositories/roleRepository');
const permissionRepository = require('../repositories/permissionRepository');
const logger = require('../config/logger');

// Middleware to check if user has the required permission
const checkPermission = (permissionID) => {
    return async (req, res, next) => {
        try {
        
            const userId = req.userId; // Assuming user ID is added to the request after authentication
            if (!userId) {
                return res.status(400).json({ message: 'User ID is missing in request' });
            }

            // Fetch user by ID
            const user = await userRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

           
            // Check if the required permission exists in any of the roles 
            let hasPermission = false;
            const permissions = await permissionRepository.getPermissionsForRole(user.role_id);
            hasPermission = permissions.some(permission => permission.permission_id === permissionID);

            if (hasPermission) {
                next();
            }else {
                return res.status(403).json({ message: 'Permission denied' });
            }

        } catch (error) {
            logger.error(`Error in checkPermission middleware: ${error.message}`);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
};

module.exports = checkPermission;
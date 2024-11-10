// src/repositories/rolePermissionRepository.js
const RolePermission = require('../../models/definedModels/RolePermission');
const Permission = require('../../models/definedModels/Permission');  // Import Permission model
const Role = require('../../models/definedModels/Role');
const logger = require('../../config/logger');


// Function to get permissions for a specific role
const getPermissionsForRole = async (roleId) => {
 

    try {
        // Fetch permissions associated with the given roleId
        const rolePermissions = await RolePermission.findAll({
            where: { role_id: roleId }, // Filter by role_id
            include: [{
                model: Permission,  // Include Permission model
                attributes: ['permission_name', 'permission_id'] // Fetch relevant permission fields
            }]
        });
        console.log("Role permissons got ", roleId)

        if (!rolePermissions || rolePermissions.length === 0) {
            logger.warn(`No permissions found for Role ID ${roleId}`);
            return []; // Return empty array if no permissions found
        }

        // Extract permission data from the result
        const permissions = rolePermissions.map(rolePermission => rolePermission.Permission);
        return permissions;
    } catch (error) {
        logger.error(`Error fetching permissions for Role ID ${roleId}: ${error.message}`);
        throw new Error('Error fetching permissions');
    }
};

module.exports = getPermissionsForRole;
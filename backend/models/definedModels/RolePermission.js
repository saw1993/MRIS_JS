// src/models/RolePermission.js

const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');
const Role = require('./Role');
const Permission = require('./Permission');

const sequelize = createMainDBConnection();

// Define the RolePermission model
class RolePermission extends Model {}

// Initialize the RolePermission model with explicit column definitions
RolePermission.init({
  roleId: {  // Renamed to camelCase to match JS conventions
    type: DataTypes.INTEGER,
    references: {
      model: Role,     // Reference the Role model
      key: 'role_id',  // Use the primary key of the Role model
    },
    allowNull: false,  // Ensure this field is not null
  },
  
  permissionId: {  // Renamed to camelCase to match JS conventions
    type: DataTypes.INTEGER,
    references: {
      model: Permission,  // Reference the Permission model
      key: 'permission_id',  // Use the primary key of the Permission model
    },
    allowNull: false,  // Ensure this field is not null
  },
}, {
  sequelize,               // Pass the Sequelize instance
  modelName: 'RolePermission',
  tableName: 'role_permissions',  // Define the junction table name
  timestamps: false,        // No need for createdAt/updatedAt fields
});

RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });

module.exports = RolePermission;
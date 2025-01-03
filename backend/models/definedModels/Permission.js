const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');

const sequelize = createMainDBConnection();

class Permission extends Model {}

// Initialize the Permission model
Permission.init({
  permission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure permission names are unique
  }
}, {
  sequelize, // Pass the Sequelize instance
  modelName: 'Permission',
  tableName: 'permissions', // Specify the correct table name
  timestamps: false, // Adds createdAt and updatedAt fields
});


module.exports = Permission;
// src/models/roleModel.js
const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');

// Create database connection instance
const sequelize = createMainDBConnection();

// Define the Role model
class Role extends Model {}

// Initialize the Role model
Role.init({
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize, // Pass the Sequelize instance
  modelName: 'Role',
  timestamps: false,  
  tableName: 'user_roles', // Specify the correct table name
});

module.exports = Role;
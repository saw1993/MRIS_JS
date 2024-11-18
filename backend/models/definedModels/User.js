// src/models/User.js
const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');
const UserHierarchy = require('./UserHierarchy');

const sequelize = createMainDBConnection();

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    agency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Enable Sequelize timestamps for createdAt and updatedAt
    createdAt: 'created_at', // Use custom database column names
    updatedAt: 'updated_at',
});

User.belongsTo(UserHierarchy, {
    foreignKey: 'user_id',
    as: 'user_hierarchy',
  });


module.exports = User;
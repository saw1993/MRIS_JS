// models/AgencyConnection.js
const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');

const sequelize = createMainDBConnection();

class Agency extends Model {
}

Agency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    db_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    db_host: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    db_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    db_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    db_port: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Agency",
    tableName: 'agency_connections',
    timestamps: false, // Use true if `created_at` is managed automatically
});

module.exports = Agency;
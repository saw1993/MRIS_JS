const { Model, DataTypes } = require('sequelize');
const { createMainDBConnection } = require('../../config/db');

const sequelize = createMainDBConnection();

class UserHierarchy extends Model {}
        UserHierarchy.init({
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            remarks: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            manager_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'UserHierarchy',
            tableName: 'user_hierarchy',
            timestamps: false,
        });
    



module.exports = UserHierarchy;
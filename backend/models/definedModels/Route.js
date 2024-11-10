// models/Route.js
const { Model, DataTypes } = require('sequelize');

class Route extends Model {
    static initModel(sequelize){
        Route.init({
            route_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            rep_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            remarks: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Route',
            tableName: 'routes',
            timestamps: false, // Assuming no createdAt or updatedAt fields
        });
    } 
}



module.exports = Route;
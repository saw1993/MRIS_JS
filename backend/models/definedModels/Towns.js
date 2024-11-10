// models/Town.js
const { Model, DataTypes } = require('sequelize');

class Town extends Model {
   static initModel(sequelize){
    Town.init({
        town_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        town_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Town',
        tableName: 'towns',
        timestamps: false, // Assuming no createdAt or updatedAt fields
    });
   }
}

module.exports = Town;
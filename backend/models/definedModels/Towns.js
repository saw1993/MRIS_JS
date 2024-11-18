const { Model, DataTypes } = require('sequelize');

class Town extends Model {
  // Define a method to initialize the model with a specific Sequelize instance
  static initModel(sequelize) {
    Town.init({
      town_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      town_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      sequelize, // Dynamically injected sequelize instance
      modelName: "Town",
      timestamps: false,  // No timestamps (createdAt/updatedAt)
      tableName: 'towns',
    });
  }
}

module.exports = Town;
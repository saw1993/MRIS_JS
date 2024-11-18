const { Model, DataTypes } = require('sequelize');
const Town = require('./Town'); // Import Town model

// Define the Pharmacy model class
class Pharmacy extends Model {
  // Define a method to initialize the model with a specific Sequelize instance
  static initModel(sequelize) {
    Pharmacy.init({
      chemist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      town_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      telephone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    }, {
      sequelize, // Dynamically injected sequelize instance
      modelName: Pharmacy,
      timestamps: false,
      tableName: 'pharmacies',
    });

    // Define associations after initializing the model
    Pharmacy.belongsTo(Town, {
      foreignKey: 'town_id',
      targetKey: 'town_id',
      as: 'town',
    });
  }
}

module.exports = Pharmacy;
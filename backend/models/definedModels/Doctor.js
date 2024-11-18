// src/models/Doctor.js
const { Model, DataTypes } = require('sequelize');
const DoctorSpeciality = require('./DoctorSpeciality'); // Import the speciality model
const Town = require('./Towns'); // Import the town model
const DoctorCategory = require('./DoctorCategory'); // Import the doctor category model

class Doctor extends Model {
  // Static method to initialize the model with a dynamic sequelize instance
  static initModel(sequelize) {
    Doctor.init({
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      slmc_no: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      remarks: {
        type: DataTypes.TEXT,
      },
      frequency: {
        type: DataTypes.INTEGER,
      },
      speciality_id: {
        type: DataTypes.INTEGER,
      },
      town_id: {
        type: DataTypes.INTEGER,
      },
    }, {
      sequelize, // Dynamically injected sequelize instance
      modelName: "Doctor", // Class name (can be pluralized if needed)
      tableName: 'doctors', // Explicit table name
      timestamps: false, // Disable automatic timestamp fields
    });

      // Doctor belongs to a DoctorCategory (many-to-one relationship)
      Doctor.belongsTo(DoctorCategory, {
        foreignKey: 'category_id',
        as: 'category',
      });
  
      // Doctor belongs to a DoctorSpeciality (many-to-one relationship)
      Doctor.belongsTo(DoctorSpeciality, {
        foreignKey: 'speciality_id',
        as: 'speciality',
      });
  
      // Doctor belongs to a Town (many-to-one relationship)
      Doctor.belongsTo(Town, {
        foreignKey: 'town_id',
        as: 'town',
      });
  }

  
}

module.exports = Doctor;
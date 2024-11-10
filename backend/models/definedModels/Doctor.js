// models/Doctor.js
const { Model, DataTypes } = require('sequelize');

class Doctor extends Model {
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
            sequelize,
            modelName:'Doctors',
            tableName: 'doctors',
            timestamps: false,
        });
    }
}

module.exports = Doctor;
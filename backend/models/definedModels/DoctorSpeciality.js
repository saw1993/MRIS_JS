// models/DoctorSpeciality.js
const { Model, DataTypes } = require('sequelize');

class DoctorSpeciality extends Model {
    static initModel(sequelize){
        DoctorSpeciality.init({
            speciality_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            speciality_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            modelName: 'DoctorSpeciality',
            tableName: 'doctor_specialities', // Ensure this matches your database table name
            timestamps: false, // Set to true if you have createdAt and updatedAt fields
        });
    }
}


module.exports = DoctorSpeciality;
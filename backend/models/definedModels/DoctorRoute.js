const { Model, DataTypes } = require('sequelize');

class DoctorRoute extends Model {
    static initModel(sequelize){
        DoctorRoute.init({
            doctor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            route_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'DoctorRoute',
            tableName: 'doctor_route',
            timestamps: false
        });

    
    } 
}



module.exports = DoctorRoute;
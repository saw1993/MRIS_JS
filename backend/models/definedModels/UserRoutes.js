const { Model, DataTypes } = require('sequelize');

class UserRoute extends Model {
    static initModel(sequelize) {
        UserRoute.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            route_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "UserRoute",
            tableName: 'user_routes',
            timestamps: false,
        });
    }
}

module.exports = UserRoute;
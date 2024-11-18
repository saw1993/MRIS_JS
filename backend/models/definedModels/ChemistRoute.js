const { tableName } = require("./DoctorSpeciality");

const ChemistRoute = sequelize.define('ChemistRouteMapping', {
    chemist_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Chemist', key: 'chemist_id' },
    },
    route_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Route', key: 'route_id' },
    }
}, { 
    tableName:"chemist_route",
    timestamps: false });

    module.exports = ChemistRoute
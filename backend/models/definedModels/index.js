// models/index.js
const { createAgencyDBConnection ,createMainDBConnection } = require('../../config/db');
const { Doctor } = require('./Doctor');
const { DoctorSpeciality } = require('./DoctorSpeciality');
const { Route } = require('./Route');
const { Town } = require('./Towns');

const initializeModelsForAgency = async (agencyDetails) => {
    const sequelize = await createAgencyDBConnection(agencyDetails); // Create the right connection


  
    // Initialize models with the sequelize instance
    Doctor.initModel(sequelize);
    console.log("Prgress ", "Doctor")
   DoctorSpeciality.initModel(sequelize);
    console.log("Prgress ", "speicality")
  Route.initModel(sequelize);
    console.log("Prgress ", "routes")
   Town.initModel(sequelize); // Initialize Town model
    console.log("Prgress ", "town")

  // Set up associations
  Doctor.belongsTo(DoctorSpeciality, { foreignKey: 'speciality_id', as: 'speciality' });
  Doctor.belongsTo(Town, { foreignKey: 'town_id', as: 'town' });
  Doctor.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });

  // Sync models to the database (remove or manage this in production)
  await sequelize.sync();

  return { sequelize, Doctor, DoctorSpeciality, Town, Route };
};

module.exports = { initializeModelsForAgency };
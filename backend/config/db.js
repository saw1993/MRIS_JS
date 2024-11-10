const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Create a Sequelize instance for the main database connection
const createMainDBConnection = () => {
    return new Sequelize('mris', 'saw1993', '1234', {
        host: 'localhost',
        dialect: 'mysql'
    });
};

// Create a Sequelize instance for the agency database connection
const createAgencyDBConnection = (agencyDetails) => {
    return new Sequelize(agencyDetails.db_name, agencyDetails.db_user, agencyDetails.db_password, {
        host: agencyDetails.db_host,
        dialect: 'mysql'
    });
};

module.exports = { createMainDBConnection, createAgencyDBConnection };

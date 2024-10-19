const { createMainDBConnection } = require('../config/db');

// Get agency database connection details
const getAgencyDBDetails = async (agency_id) => {
    const connection = await createMainDBConnection();
    const [rows] = await connection.execute('SELECT * FROM agency_connections WHERE agency_id = ?', [agency_id]);
    connection.end();
    return rows[0]; // Returns the connection details for the agency's DB
};

module.exports = { getAgencyDBDetails };
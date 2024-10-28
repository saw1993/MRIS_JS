const pool = require('../config/db');
const logger = require('../config/logger');
const { createAgencyDBConnection } = require('../config/db');

const Route = {

    // Add a new town
    addRoute: async (RouteData) => {
        const { route_id, name , rep_id,remarks } = RouteData;
        logger.info('Adding new Route', { townData });

        const query = 'INSERT INTO routes (route_id, name , rep_id,remarks) VALUES (?, ?,?,?)';
        try {
            const [results] = await db.query(query, [route_id, name, rep_id,remarks]);
            logger.info('New Route added successfully', { route_id: results.insertId });
            return results;
        } catch (err) {
            logger.error('Error adding new Route', { RouteData, error: err.message });
            throw err;
        }
    },

    getByAgency:async(agencyDetails)=> {
       
    },


    // Get all towns
    getAllRoutes: async (agencyDetails) => {
        logger.info('Fetching all Routes');
        const query = 'SELECT * FROM towns';
        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [rows] = await connection.execute('SELECT * FROM routes');
            connection.end();
            return rows;
        } catch (err) {
            logger.error('Error fetching routes', { error: err.message });
            throw err;
        }
    },

      // Check if a town exists
      checkRouteExists: async (route_id) => {
        try {
            const [results] = await pool.query('SELECT 1 FROM routes WHERE route_id = ?', [route_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    
}

module.exports=Route;

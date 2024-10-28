const pool = require('../config/db');
const logger = require('../config/logger');
const { createAgencyDBConnection } = require('../config/db');

const Town = {

    // Add a new town
    addTown: async (townData) => {
        const { town_id, town_name } = townData;
        logger.info('Adding new town', { townData });

        const query = 'INSERT INTO towns (town_id, town_name) VALUES (?, ?)';
        try {
            const [results] = await db.query(query, [town_id, town_name]);
            logger.info('New town added successfully', { townId: results.insertId });
            return results;
        } catch (err) {
            logger.error('Error adding new town', { townData, error: err.message });
            throw err;
        }
    },

    getTownsByAgency:async(agencyDetails)=> {
        logger.info('Fetching all towns');
        const connection = await createAgencyDBConnection(agencyDetails);
        const [rows] = await connection.execute('SELECT * FROM towns');
        connection.end();
        return rows;
    },


    // Get all towns
    getAllTowns: async () => {
        
        const query = 'SELECT * FROM towns';
        try {
            const [results] = await db.query(query);
            return results;
        } catch (err) {
            logger.error('Error fetching towns', { error: err.message });
            throw err;
        }
    },

      // Check if a town exists
      checkTownExists: async (town_id,agencyDetails) => {
        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [results] = await connection.query('SELECT 1 FROM towns WHERE town_id = ?', [town_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    
}

module.exports=Town;

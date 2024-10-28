const pool = require('../config/db');
const logger = require('../config/logger');
const { createAgencyDBConnection } = require('../config/db');

const DoctorCateogry = {


             // Get all specialities
    getAllCategories: async (agencyDetails) => {
                logger.info('Fetching all cateogries');
                try {
                    const connection = await createAgencyDBConnection(agencyDetails);
                    const [rows] = await connection.execute('SELECT * FROM doctor_category');
                    connection.end();
                    return rows;
                } catch (err) { 
                    logger.error('Error fetching category', { error: err.message });
                    throw err;
                }
            },

     // Check if a category exists
     checkCategoryExists: async (category_id,agencyDetails) => {
        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [results] = await connection.query('SELECT 1 FROM doctor_category WHERE category_id = ?', [category_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },
    
}
module.exports=DoctorCateogry;
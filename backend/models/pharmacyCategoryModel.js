const pool = require('../config/db');
const logger = require('../config/logger');

const PharmacyCateogry = {

     // Check if a category exists
     checkCategoryExists: async (category_id) => {
        try {
            const [results] = await pool.query('SELECT 1 FROM pharmacy_category WHERE category_id = ?', [category_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },
    
}
module.exports=PharmacyCateogry;
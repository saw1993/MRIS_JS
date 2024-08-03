const pool = require('../config/db');
const logger = require('../config/logger');

const Speciality = {
        // Add a new speciality
        addSpeciality: async (specialityData) => {
            const { speciality_id, speciality_name } = specialityData;
            logger.info('Adding new speciality', { specialityData });
    
            const query = 'INSERT INTO doctor_specialities (speciality_id, speciality_name) VALUES (?, ?)';
            try {
                const [results] = await db.query(query, [speciality_id, speciality_name]);
                logger.info('New speciality added successfully', { specialityId: results.insertId });
                return results;
            } catch (err) {
                logger.error('Error adding new speciality', { specialityData, error: err.message });
                throw err;
            }
        },


          // Get all specialities
    getAllSpecialities: async () => {
        logger.info('Fetching all specialties');
        const query = 'SELECT * FROM doctor_specialities';
        try {
            const [results] = await db.query(query);
            return results;
        } catch (err) { 
            logger.error('Error fetching specialties', { error: err.message });
            throw err;
        }
    },

    checkSpecialityExists: async (speciality_id) => {
        try {
            const [results] = await pool.query('SELECT 1 FROM doctor_specialities WHERE speciality_id = ?', [speciality_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    
}

module.exports=Speciality;

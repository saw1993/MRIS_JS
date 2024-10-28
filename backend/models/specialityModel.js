const pool = require('../config/db');
const logger = require('../config/logger');
const { createAgencyDBConnection } = require('../config/db');

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
    getAllSpecialities: async (agencyDetails) => {
        logger.info('Fetching all specialties');
        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [rows] = await connection.execute('SELECT * FROM doctor_specialities');
            connection.end();
            return rows;
        } catch (err) { 
            logger.error('Error fetching specialties', { error: err.message });
            throw err;
        }
    },


    checkSpecialityExists: async (speciality_id,agencyDetails) => {
        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [results] = await connection.query('SELECT 1 FROM doctor_specialities WHERE speciality_id = ?', [speciality_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    
}

module.exports=Speciality;

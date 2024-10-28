const pool = require('../config/db');
const logger = require('../config/logger');
const { createAgencyDBConnection } = require('../config/db');

const Doctor = {

    getDoctorsByAgency:async(agencyDetails)=> {
        const connection = await createAgencyDBConnection(agencyDetails);
        const [rows] = await connection.execute('SELECT * FROM doctors');
        connection.end();
        return rows;
    },
    
    // Get all doctors
    getAll: async () => {
        logger.info('Fetching all doctors');

        try {
            const [results] = await pool.query('SELECT * FROM doctors');
            logger.info('Doctors fetched successfully', { results });
            return results;
        } catch (err) {
            logger.error('Error fetching doctors', { error: err.message });
            throw err;
        }
    },

    // Get doctor by ID
    getById: async (id) => {
        logger.info('Fetching doctor by ID', { id });

        try {
            const [results] = await pool.query(
                'SELECT * FROM doctors d JOIN doctor_specialities s ON d.speciality_id = s.speciality_id JOIN towns t ON d.town_id = t.town_id WHERE d.doctor_id = ?',
                [id]
            );
            logger.info('Doctor fetched successfully', { id, results });
            return results;
        } catch (err) {
            logger.error('Error fetching doctor by ID', { id, error: err.message });
            throw err;
        }
    },

    // Create a new doctor
    create: async (data,agencyDetails) => {
        const { name, speciality_id, category_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency } = data;

        
        logger.info('Creating doctor', { data });


        const query = 'INSERT INTO doctors (name, speciality_id, category_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [name, speciality_id, category_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency];

        try {
            const connection = await createAgencyDBConnection(agencyDetails);
            const [results] = await connection.query(query, values);
            logger.info('Doctor created successfully', { doctorId: results.insertId });
            return results;
        } catch (err) {
            logger.error('Error creating doctor', { data, error: err.message });
            throw err;
        }
    },

    // Update a doctor
    update: async (id, data) => {
        const { name, speciality_id, category_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency } = data;

        logger.info('Updating doctor', { id, data });

        // Validate speciality, category, and town existence
        const specialityExists = await Doctor.checkSpecialityExists(speciality_id);
        if (!specialityExists) {
            logger.warn('Speciality does not exist', { speciality_id });
            throw new Error('Speciality does not exist');
        }

        const categoryExists = await Doctor.checkCategoryExists(category_id);
        if (!categoryExists) {
            logger.warn('Category does not exist', { category_id });
            throw new Error('Category does not exist');
        }

        const townExists = await Doctor.checkTownExists(town_id);
        if (!townExists) {
            logger.warn('Town does not exist', { town_id });
            throw new Error('Town does not exist');
        }

        const query = 'UPDATE doctors SET name = ?, speciality_id = ?, category_id = ?, town_id = ?, telephone = ?, email = ?, slmc_no = ?, birthday = ?, remarks = ?, frequency = ? WHERE doctor_id = ?';
        const values = [name, speciality_id, category_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency, id];

        try {
            const [results] = await pool.query(query, values);
            logger.info('Doctor updated successfully', { id });
            return results;
        } catch (err) {
            logger.error('Error updating doctor', { id, data, error: err.message });
            throw err;
        }
    },

    // Delete a doctor
    delete: async (id) => {
        logger.info('Deleting doctor', { id });

        try {
            const [results] = await pool.query('DELETE FROM doctors WHERE doctor_id = ?', [id]);
            logger.info('Doctor deleted successfully', { id });
            return results;
        } catch (err) {
            logger.error('Error deleting doctor', { id, error: err.message });
            throw err;
        }
    }
};

module.exports = Doctor;
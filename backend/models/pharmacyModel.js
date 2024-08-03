const pool = require('../config/db');
const logger = require('../config/logger');

const Pharmacy = {
    // Check if a town exists
    checkTownExists: async (town_id) => {
        try {
            const [results] = await pool.query('SELECT 1 FROM towns WHERE town_id = ?', [town_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    // Check if a category exists
    checkCategoryExists: async (category_id) => {

        try {
            const [results] = await pool.query('SELECT 1 FROM pharmacy_cateogry WHERE category_id = ?', [category_id]);
            return results.length > 0;
        } catch (err) {
            throw err;
        }
    },

    // Get all pharmacies
    getAll: async () => {
        try {
            const [results] = await pool.query('SELECT * FROM pharmacies');
            return results;
        } catch (err) {
            logger.error('Error fetching pharmacies', { error: err.message });
            throw err;
        }
    },

    // Get pharmacy by ID
    getById: async (id) => {
        try {
            const [results] = await pool.query('SELECT * FROM pharmacies WHERE ph_id = ?', [id]);
            return results;
        } catch (err) {
            logger.error('Error fetching pharmacy by ID', { id, error: err.message });
            throw err;
        }
    },

    // Create a new pharmacy
    create: async (data) => {
        const { town_id, category_id, name, telephone, email, remarks } = data;
           const query = 'INSERT INTO pharmacies (town_id, category_id, name, telephone, email, remarks) VALUES (?, ?, ?, ?, ?, ?)';
           const values = [town_id, category_id, name, telephone, email, remarks];
   

        try {
            const [results] = await pool.query(query, values);
            return results;
        } catch (err) {
            logger.error('Error creating pharmacy', { data, error: err.message });
            throw err;
        }
    },

    // Update a pharmacy
    update: async (id, data) => {
        const { town_id, category_id, name, telephone, email, remarks } = data;
        const query = 'UPDATE pharmacies SET town_id = ?, category_id = ?, name = ?, telephone = ?, email = ?, remarks = ? WHERE ph_id = ?';
        const values = [town_id, category_id, name, telephone, email, remarks, id];

        try {
            const [results] = await pool.query(query, values);
            return results;
        } catch (err) {
            logger.error('Error updating pharmacy', { id, data, error: err.message });
            throw err;
        }
    },

    // Delete a pharmacy
    delete: async (id) => {
        try {
            const [results] = await pool.query('DELETE FROM pharmacies WHERE ph_id = ?', [id]);
            return results;
        } catch (err) {
            logger.error('Error deleting pharmacy', { id, error: err.message });
            throw err;
        }
    }
};

module.exports = Pharmacy;
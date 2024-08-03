const pool = require('../config/db');
const Town = require('../models/townModel');
const Category = require('../models/pharmacyCategoryModel');
const Pharmacy = require('../models/pharmacyModel');
const logger = require('../config/logger');

const getPharmacies = async (req, res) => {
    const user = req.user;
    logger.info('Accessing getPharmacy route', { user });

    try {
        const results = await Pharmacy.getAll();
        res.json(results);
    } catch (err) {
        logger.error('Error fetching pharmacies', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};


const getPharmacyById = async (req, res) => {
    const id = req.query.id;
    logger.info('Accessing getPharmacyById route', { id });

    if (!id) {
        logger.error('Pharmacy ID is required');
        return res.status(400).json({ error: 'Pharmacy ID is required' });
    }

    try {
        const results = await Pharmacy.getById(id);
        if (results.length === 0) {
            logger.warn('Pharmacy not found', { id });
            return res.status(404).json({ message: 'Pharmacy not found' });
        }
        logger.info('Pharmacy fetched successfully', { doctor: results[0] });
        res.json(results[0]);
    } catch (err) {
        logger.error('Error fetching Pharmacy by ID', { id, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const createPharmacy = async (req, res) => {
    const data = req.body;
    logger.info('Accessing create Pharmacy route', { data });

      // Validate input data
    if (!data.name || !data.town_id) {
        logger.error('Missing required fields', { missingFields: data });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const categoryExists = await Category.checkCategoryExists(data.category_id);
    if (!categoryExists) {
        logger.warn('Category does not exist');
        return res.status(400).json({ error: 'Category does not exist' });
    }

    const townExists = await Town.checkTownExists(data.town_id);
    if (!townExists) {
        logger.warn('Town does not exist'); 
        return res.status(400).json({ error: 'Town does not exist' });
    }

    try {
    
        // Insert if both checks pass
        const result = await Pharmacy.create(data);
        logger.info('Pharmacy created successfully', { doctorId: result.insertId });
        res.status(201).json({ message: 'Pharmacy created', doctorId: result.insertId });
    } catch (err) {
        logger.error('Error creating Pharmacy', { data, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const updatePharmacy = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    logger.info('Accessing Update Pharmacy route', { id, data });

     // Validate speciality, category, and town existence
 
     const categoryExists = await Category.checkCategoryExists(category_id);
     if (!categoryExists) {
         logger.warn('Category does not exist', { category_id });
         throw new Error('Category does not exist');
     }
 
     const townExists = await Town.checkTownExists(town_id);
     if (!townExists) {
         logger.warn('Town does not exist', { town_id });
         throw new Error('Town does not exist');
     }

    try {
        await Pharmacy.update(id, data);
        logger.info('Pharmacy updated successfully', { id });
        res.json({ message: 'Pharmacy updated' });
    } catch (err) {
        logger.error('Error updating Pharmacy', { id, data, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const deletePharmacy = async (req, res) => {
    const id = req.params.id;
    logger.info('Accessing delete Pharmacy route', { id });

    try {
        await Doctor.delete(id);
        logger.info('Pharmacy deleted successfully', { id });
        res.json({ message: 'Pharmacy deleted' });
    } catch (err) {
        logger.error('Error Pharmacy doctor', { id, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

module.exports = {getPharmacies, getPharmacyById, createPharmacy, updatePharmacy, deletePharmacy };
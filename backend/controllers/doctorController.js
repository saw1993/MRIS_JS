const Doctor = require('../models/doctorModel');
const Town = require('../models/townModel');
const Category = require('../models/doctorCategoryModel');
const Speciality = require('../models/specialityModel');
const logger = require('../config/logger');

const { getUserById } = require('../models/userModel');
const { getAgencyDBDetails } = require('../models/agencyModel');
const { getDoctorsByAgency } = require('../models/doctorModel');


// Fetch doctors based on user agency
const getDoctors = async (req, res) => {
    try {
        const user = await getUserById(req.userId);
        const agency_id = user.agency_id;
        const agencyDBDetails = await getAgencyDBDetails(agency_id);
        const doctors = await getDoctorsByAgency(agencyDBDetails);
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const err_getDoctors = async (req, res) => {
    const user = req.user;
    logger.info('Accessing getDoctors route', { user });

    try {
        const results = await Doctor.getAll();
        res.json(results);
    } catch (err) {
        logger.error('Error fetching doctors', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const getDoctorById = async (req, res) => {
    const id = req.query.id;
    logger.info('Accessing getDoctorById route', { id });

    if (!id) {
        logger.error('Doctor ID is required');
        return res.status(400).json({ error: 'Doctor ID is required' });
    }

    try {
        const results = await Doctor.getById(id);
        if (results.length === 0) {
            logger.warn('Doctor not found', { id });
            return res.status(404).json({ message: 'Doctor not found' });
        }
        logger.info('Doctor fetched successfully', { doctor: results[0] });
        res.json(results[0]);
    } catch (err) {
        logger.error('Error fetching doctor by ID', { id, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const createDoctor = async (req, res) => {
    const data = req.body;
    logger.info('Accessing createDoctor route', { data });

     // Validate input data
     if (!data.name || !data.speciality_id || !data.town_id || !data.frequency) {
        logger.error('Missing required fields', { missingFields: data });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate speciality, category, and town existence
    const specialityExists = await Speciality.checkSpecialityExists(data.speciality_id);
    if (!specialityExists) {
        logger.warn('Speciality does not exist');
        return res.status(400).json({ error: 'Speciality ID does not exist' });
    }

    const categoryExists = await Category.checkCategoryExists(data.category_id);
    if (!categoryExists) {
        logger.warn('Category does not exist');
        return res.status(400).json({ error: 'Category ID does not exist' });
    }

    const townExists = await Town.checkTownExists(data.town_id);
    if (!townExists) {
        logger.warn('Town does not exist', { town_id });
        return res.status(400).json({ error: 'Town ID does not exist' });
    }


    try {
    
        // Insert doctor if both checks pass
        const result = await Doctor.create(data);
        logger.info('Doctor created successfully', { doctorId: result.insertId });
        res.status(201).json({ message: 'Doctor created', doctorId: result.insertId });
    } catch (err) {
        logger.error('Error creating doctor', { data, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const updateDoctor = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    logger.info('Accessing updateDoctor route', { id, data });

     // Validate speciality, category, and town existence
     const specialityExists = await Speciality.checkSpecialityExists(speciality_id);
     if (!specialityExists) {
         logger.warn('Speciality does not exist', { speciality_id });
         throw new Error('Speciality does not exist');
     }
 
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
        await Doctor.update(id, data);
        logger.info('Doctor updated successfully', { id });
        res.json({ message: 'Doctor updated' });
    } catch (err) {
        logger.error('Error updating doctor', { id, data, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    logger.info('Accessing deleteDoctor route', { id });

    try {
        await Doctor.delete(id);
        logger.info('Doctor deleted successfully', { id });
        res.json({ message: 'Doctor deleted' });
    } catch (err) {
        logger.error('Error deleting doctor', { id, error: err.message });
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
const Speciality = require('../models/specialityModel');
const logger = require('../config/logger');


const addSpeciality = async (req, res) => {
    const specialityData = req.body;
    logger.info('Request to add new speciality', { specialityData });

    if (!specialityData.speciality_id || !specialityData.speciality_name) {
        logger.error('Missing required fields for speciality', { specialityData });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await Speciality.addSpeciality(specialityData);
        res.status(201).json({ message: 'Speciality added successfully', specialityId: result.insertId });
    } catch (err) {
        logger.error('Error adding new speciality', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const getAllSpecialities = async (req, res) => {
    logger.info('Request to fetch all specialties');
    try {
        const results = await Speciality.getAllSpecialities();
        res.status(200).json(results);
    } catch (err) {
        logger.error('Error fetching specialties', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

module.exports = {addSpeciality, getAllSpecialities };
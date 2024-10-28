const Town = require('../models/townModel');
const logger = require('../config/logger');
const { getUserById } = require('../models/userModel');
const { getAgencyDBDetails } = require('../models/agencyModel');

const addTown = async (req, res) => {
    const townData = req.body;
    logger.info('Request to add new town', { townData });

    if (!townData.town_id || !townData.town_name) {
        logger.error('Missing required fields for town', { townData });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await Town.addTown(townData);
        res.status(201).json({ message: 'Town added successfully', townId: result.insertId });
    } catch (err) {
        logger.error('Error adding new town', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const getAllTowns = async (req, res) => {
    logger.info('Request to fetch all towns');
    try {
        const user = await getUserById(req.userId);
        const agency_id = user.agency_id;
        const agencyDBDetails = await getAgencyDBDetails(agency_id);
        const results = await Town.getTownsByAgency(agencyDBDetails);
        res.status(200).json(results);
    } catch (err) {
        logger.error('Error fetching towns', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTown, getAllTowns};
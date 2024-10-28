const Route = require('../models/routeModel');
const logger = require('../config/logger');
const { getUserById } = require('../models/userModel');
const { getAgencyDBDetails } = require('../models/agencyModel');

const addRoute = async (req, res) => {
    const routeData = req.body;
    logger.info('Request to add new route', { routeData });

    if (!routeData.route_id || !routeData.name) {
        logger.error('Missing required fields for route', { townData });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await Route.addRoute(routeData);
        res.status(201).json({ message: 'Route added successfully', routeId: result.insertId });
    } catch (err) {
        logger.error('Error adding new route', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

const getAllRoutes = async (req, res) => {
    logger.info('Request to fetch all routes');
    try {
        const user = await getUserById(req.userId);
        const agency_id = user.agency_id;
        const agencyDBDetails = await getAgencyDBDetails(agency_id);
        const results = await Route.getAllRoutes(agencyDBDetails);
        res.status(200).json(results);
    } catch (err) {
        logger.error('Error fetching routes', { error: err.message });
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addRoute, getAllRoutes};
const Agency = require('../models/definedModels/Agency');

const getAgencyDBDetails = async (agency_id) => {
    try {
        const agencyDetails = await Agency.findOne({
            where: { agency_id },
            attributes: ['db_name', 'db_host', 'db_user', 'db_password', 'db_port', 'remarks']
        });
        if (!agencyDetails) {
            throw new Error(`No database connection details found for agency_id ${agency_id}`);
        }
        return agencyDetails.get({ plain: true }); // Returns plain object with connection details
    } catch (error) {
        console.error(`Error fetching agency database details: ${error.message}`);
        throw error;
    }
};

module.exports = { getAgencyDBDetails };
const { Op } = require('sequelize'); 
const DoctorRoute = require('../../models/definedModels/DoctorRoute');
const getDocByIds= require('../doctor/getDoctorsByIds')

async function setupModels(sequelize) {
    DoctorRoute.initModel(sequelize);
}

async function getDocByRouteId(user_routes, sequelize) {
    await setupModels(sequelize);

    try {
        // Validate user_routes
        if (!user_routes || !Array.isArray(user_routes)) {
            throw new Error('Invalid user_routes. Expected an array.');
        }

        // Extract route IDs from user_routes
        const routeIds = user_routes.map(userRoute => userRoute.dataValues.route_id);

        console.log('Received user_routes:', routeIds);

        if (routeIds.length === 0) {
            throw new Error('No route IDs found in user_routes.');
        }

        const docs = await DoctorRoute.findAll({
            attributes: ['doctor_id'], // Specify existing columns to avoid unknown column errors
            where: {
                route_id: {
                    [Op.in]: routeIds,
                },
            },
        });

     // Extract doctor IDs into an array
     const doctorIds = docs.map(doc => doc.doctor_id);

     if (doctorIds.length === 0) {
         console.log('No doctors found for the provided route IDs.');
         return [];
     }

     // Fetch doctor details by IDs
     const doctorDetails = await getDocByIds(doctorIds, sequelize);

     return doctorDetails;

        return docs; // Return the list of doctors if needed

    } catch (error) {
        console.error('Error retrieving doctors by route IDs:', error);
        throw new Error('Unable to fetch doctor data by route IDs');
    }
}

module.exports = getDocByRouteId;
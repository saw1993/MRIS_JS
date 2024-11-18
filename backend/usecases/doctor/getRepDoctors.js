const { where } = require('sequelize');
const getUserRoutes = require('../routes/getUserRoutes')
const getDocByRouteId = require('../routes/getDocByRouteId')


async function getRepDoctors(rep_id, sequelize) {

    try {
        // Fetch user_routes with associated routes and doctors
        const user_routes = await getUserRoutes(rep_id,sequelize)
        const docs = await getDocByRouteId(user_routes,sequelize)

        return docs


    } catch (error) {
        console.error('Error retrieving doctors:', error);
        throw new Error('Unable to fetch doctor data');
    }
}

module.exports = getRepDoctors;
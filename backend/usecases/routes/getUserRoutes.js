const { where } = require('sequelize');
const UserRoute = require('../../models/definedModels/UserRoutes');

async function setupModels(sequelize) {
    UserRoute.initModel(sequelize);
}


async function getUserRoutes(rep_id, sequelize) {
    await setupModels(sequelize);

    try {
        // Fetch user_routes with associated routes and doctors
        const user_routes = await UserRoute.findAll({
            where: { user_id: rep_id },
        });

      return user_routes
      
    } catch (error) {
        console.error('Error retrieving user routes:', error);
        throw new Error('Unable to fetch user route data');
    }
}

module.exports = getUserRoutes;
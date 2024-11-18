const { Op } = require('sequelize'); 
const Doctor = require('../../models/definedModels/Doctor');
const DoctorSpeciality = require('../../models/definedModels/DoctorSpeciality');
const DoctorCategory = require('../../models/definedModels/DoctorCategory');
const Town = require('../../models/definedModels/Towns');

async function setupModels(sequelizeInstance) {
  

  DoctorSpeciality.initModel(sequelizeInstance);
  DoctorCategory.initModel(sequelizeInstance);
  Town.initModel(sequelizeInstance);
  Doctor.initModel(sequelizeInstance);
 
}

async function getAllDoctors(doc_ids, sequelizeInstance) {
  await setupModels(sequelizeInstance); 

  try {

    const doctors = await Doctor.findAll({
        where: {
            doctor_id: {
                [Op.in]: doc_ids,
            },
        },
      include: [
        {
          model: DoctorSpeciality,
          as: 'speciality',
          attributes: ['speciality_id', 'speciality_name'], // Specify attributes to fetch from DoctorSpeciality table
        },
        {
          model: DoctorCategory,
          as: 'category',
          attributes: ['category_id', 'category_name'], // Specify attributes to fetch from DoctorCategory table
        },
        {
          model: Town,
          as: 'town',
          attributes: ['town_id', 'town_name'], // Specify attributes to fetch from Town table
        },
      ],
    });

    // Return the doctors along with their associated details
    return doctors;
  } catch (error) {
    console.error('Error retrieving doctors:', error);
    throw new Error('Unable to fetch doctor data');
  }
}

module.exports =getAllDoctors;
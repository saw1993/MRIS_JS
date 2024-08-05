const express = require('express');
const router = express.Router();
const TownController = require('../controllers/town_controller');
const specialityController = require('../controllers/specialityController');

// Route to add a new town
router.post('/towns', TownController.addTown);

// Route to add a new speciality
router.post('/specialities', specialityController.addSpeciality);

// Route to get all towns
router.get('/towns', TownController.getAllTowns);

// Route to get all specialities
router.get('/specialities', specialityController.getAllSpecialities);

module.exports = router;
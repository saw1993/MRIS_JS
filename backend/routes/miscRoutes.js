const express = require('express');
const router = express.Router();
const TownController = require('../controllers/town_controller');
const specialityController = require('../controllers/specialityController');
const routeController = require('../controllers/routeController');
const authenticateJWT = require('../middlewares/authMiddleware');
const doctor = require('../controllers/doctorController');

// Route to add a new town
router.post('/towns', TownController.addTown);

// Route to add a new speciality
router.post('/specialities', specialityController.addSpeciality);

// Route to get all towns
router.get('/towns',authenticateJWT, TownController.getAllTowns);

// Route to get all cateogry
router.get('/category',authenticateJWT, doctor.getCategory);

// Route to get all routes
router.get('/routes',authenticateJWT, routeController.getAllRoutes);

// Route to get all specialities
router.get('/specialities',authenticateJWT, specialityController.getAllSpecialities);

module.exports = router;
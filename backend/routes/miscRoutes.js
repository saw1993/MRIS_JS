const express = require('express');
const router = express.Router();
const MiscController = require('../controllers/miscController');

// Route to add a new town
router.post('/towns', MiscController.addTown);

// Route to add a new speciality
router.post('/specialities', MiscController.addSpeciality);

// Route to get all towns
router.get('/towns', MiscController.getAllTowns);

// Route to get all specialities
router.get('/specialities', MiscController.getAllSpecialities);

module.exports = router;
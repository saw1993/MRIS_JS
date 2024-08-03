const express = require('express');
const { getPharmacies, getPharmacyById, createPharmacy, updatePharmacy, deletePharmacy } = require('../controllers/pharmacyController');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware.js');
const router = express.Router();

router.get('/getall',authenticateJWT, authorizeRole('admin'), getPharmacies);
router.get('/:id',authenticateJWT, authorizeRole('admin'), getPharmacyById);
router.post('/add', authenticateJWT, authorizeRole('admin'),createPharmacy);
router.put('/update/:id',authenticateJWT, authorizeRole('admin'), updatePharmacy);
router.delete('/delete/:id',authenticateJWT, authorizeRole('admin'), deletePharmacy);

module.exports = router;


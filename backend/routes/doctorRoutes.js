const express = require('express');
const { getDoctors, getDoctorById ,createDoctor, updateDoctor, deleteDoctor} = require('../controllers/doctorController.js');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware.js');
const router = express.Router();
const PERMISSIONS = require('../constants/PermissionData.js'); 
const checkPermission = require('../middlewares/checkPermissionMiddleware.js');

router.get('/getall',authenticateJWT, checkPermission(PERMISSIONS.VIEW_DOCTORS), getDoctors);
router.get('/:id',authenticateJWT, authorizeRole('admin'), getDoctorById);
router.post('/add', authenticateJWT, authorizeRole('admin'),createDoctor);
router.put('/update/:id',authenticateJWT, authorizeRole('admin'), updateDoctor);
router.delete('/delete/:id',authenticateJWT, authorizeRole('admin'), deleteDoctor);

module.exports = router;
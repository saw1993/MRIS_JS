const express = require('express');
const { getDoctors, getDoctorById ,createDoctor, updateDoctor, deleteDoctor} = require('../controllers/doctorController.js');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware.js');
const router = express.Router();
const PERMISSIONS = require('../constants/PermissionData.js'); 
const checkPermission = require('../middlewares/checkPermissionMiddleware.js');

router.get('/getall',authenticateJWT, checkPermission(PERMISSIONS.VIEW_DOCTORS), getDoctors);
router.get('/:id',authenticateJWT, checkPermission(PERMISSIONS.VIEW_DOCTORS), getDoctorById);
router.post('/add', authenticateJWT, checkPermission(PERMISSIONS.CREATE_DOCTOR),createDoctor);
router.put('/update/:id',authenticateJWT, checkPermission(PERMISSIONS.EDIT_DOCTOR), updateDoctor);
router.delete('/delete/:id',authenticateJWT, checkPermission(PERMISSIONS.DELETE_DOCTOR), deleteDoctor);

module.exports = router;
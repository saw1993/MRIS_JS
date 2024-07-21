const express = require('express');
const { getDoctors, getDoctorById ,createDoctor} = require('../controllers/doctorController.js');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware.js');
const router = express.Router();

router.get('/getall', authenticateJWT, authorizeRole(
    'admin',
    'Chief Executive Officer', 
    'Chief Operation Officer', 
    'Brand Manager', 
    'Sales Manager', 
    'Area Sales Manager', 
    'Field Manager', 
    'Sales Representative', 
    'Medical Representative'
            ), getDoctors);

router.get('/get', authenticateJWT, authorizeRole(
                'admin',
                'Chief Executive Officer', 
                'Chief Operation Officer', 
                'Brand Manager', 
                'Sales Manager', 
                'Area Sales Manager', 
                'Field Manager', 
                'Sales Representative', 
                'Medical Representative'
                        ), getDoctorById);

router.post('/create', authenticateJWT, authorizeRole(
                            'admin',
                            'Chief Executive Officer', 
                            'Chief Operation Officer', 
                            'Brand Manager', 
                            'Sales Manager', 
                            'Area Sales Manager', 
                            'Field Manager', 
                            'Sales Representative', 
                            'Medical Representative'
                                    ), createDoctor);

module.exports = router;
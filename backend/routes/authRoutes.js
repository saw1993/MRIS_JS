const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/user',getUserProfile)

module.exports = router;
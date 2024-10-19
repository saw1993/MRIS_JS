const express = require('express');
const { login ,verify } = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/verify',verify);
router.post('/sample',authenticateJWT,authorizeRole('admin'),verify);

module.exports = router;
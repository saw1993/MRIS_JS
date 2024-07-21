const express = require('express');
const { getUsers } = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware.js');
const router = express.Router();

router.get('/add', authenticateJWT, authorizeRole(['admin']), getUsers);
router.get('/get', authenticateJWT, authorizeRole(['admin']), getUsers);

module.exports = router;
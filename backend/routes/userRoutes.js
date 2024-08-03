const express = require('express');
const { addUser, editUser, deleteUserById } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authenticateToken, addUser);
router.put('/edit/:id', authenticateToken, editUser);
router.delete('/delete/:id', authenticateToken, deleteUserById);

module.exports = router;
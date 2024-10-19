const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {userIndex, userEdit, userUpdate, userDelete} = require('../controller/userController');

const router = express.Router();

// Get all users (protected route)
router.get('/', protect, userIndex);

// Get user by ID (protected route)
router.get('/:id', protect, userEdit);

// Update user (protected route)
router.put('/:id', protect, userUpdate);

// Delete user (protected route)
router.delete('/delete/:id', protect, userDelete);

module.exports = router;

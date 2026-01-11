// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const {
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');

// Get all users (Super Admin only)
router.get('/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN'),
  getAllUsers
);

// Update user role (Super Admin only)
router.patch('/:id/role',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN'),
  updateUserRole
);

// Delete user (Super Admin only)
router.delete('/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN'),
  deleteUser
);

module.exports = router;
 const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseEnrollments
} = require('../controllers/courseController');

// GET all courses (ALL ROLES)
router.get(
  '/',
  authenticateToken,
  getAllCourses
);

// GET course details (ALL ROLES)
router.get(
  '/:id',
  authenticateToken,
  getCourseById
);

// CREATE (INSTRUCTOR + ADMIN)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('INSTRUCTOR', 'SUPER_ADMIN'),
  createCourse
);

// UPDATE
 router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("INSTRUCTOR", "SUPER_ADMIN"),
  updateCourse
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("INSTRUCTOR", "SUPER_ADMIN"),
  deleteCourse
);

// ENROLLMENTS
router.get(
  '/:id/enrollments',
  authenticateToken,
  authorizeRoles('INSTRUCTOR', 'SUPER_ADMIN'),
  getCourseEnrollments
);

module.exports = router;

 const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const {
  enrollInCourse,
  getMyEnrollments,
} = require("../controllers/enrollmentController");

// Enroll in a course (Students only)
router.post(
  "/:courseId",
  authenticateToken,
  authorizeRoles("STUDENT"),
  enrollInCourse  
);

// Get my enrollments (Students only)
router.get(
  "/mycources",
  authenticateToken,
  authorizeRoles("STUDENT"),
  getMyEnrollments
);

module.exports = router;

// controllers/enrollmentController.js
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Enroll in course
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

        const course = await Course.findById(courseId);
     if (!course) {
        return res.status(404).json({ error: "Course not found" });
           }
    if (course.status !== 'PUBLISHED') {
      return res.status(400).json({ error: 'Cannot enroll in unpublished course' });
    }

    const existing = await Enrollment.findOne({
      student: req.user.id,
      course: courseId
    });

    if (existing) {
      return res.status(400).json({ error: 'Already enrolled' });
    }

    const enrollment = new Enrollment({
      student: req.user.id,
      course: courseId
    });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get my enrollments
  
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
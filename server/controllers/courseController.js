// controllers/courseController.js
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Get all courses (with role-based filtering)
exports.getAllCourses = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'INSTRUCTOR') {
      query.instructor = req.user.id;
    } else if (req.user.role === 'STUDENT') {
      query.status = 'PUBLISHED';
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const enrollmentCount = await Enrollment.countDocuments({ course: course._id });
        return {
          ...course.toObject(),
          enrollments: enrollmentCount
        };
      })
    );

    res.json(coursesWithStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Access control
    if (req.user.role === 'STUDENT' && course.status !== 'PUBLISHED') {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (req.user.role === 'INSTRUCTOR' && course.instructor._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const enrollmentCount = await Enrollment.countDocuments({ course: course._id });

    res.json({
      ...course.toObject(),
      enrollments: enrollmentCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create course
  exports.createCourse = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    const course = await Course.create({
      title,
      description,
      status: status || "DRAFT",
      instructor: req.user.id, // BOTH instructor & admin
    });

    await course.populate('instructor', 'name email');
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (req.user.role === 'INSTRUCTOR' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { title, description, status } = req.body;
    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.status = status ?? course.status;
    course.updatedAt = Date.now();

    await course.save();
    await course.populate('instructor', 'name email');
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (req.user.role === 'INSTRUCTOR' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Course.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ course: req.params.id });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get enrollments for a course
exports.getCourseEnrollments = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (req.user.role === 'INSTRUCTOR' && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const enrollments = await Enrollment.find({ course: req.params.id })
      .populate('student', 'name email');

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
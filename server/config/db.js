// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use credentials in MONGODB_URI if available, otherwise fallback to localhost
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-platform';

    // Connect to MongoDB
    await mongoose.connect(mongoURI); // Mongoose 7+ handles options internally
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

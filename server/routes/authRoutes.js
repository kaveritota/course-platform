const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { forgotPassword } = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post("/forgot-password", forgotPassword);

// router.post('/refresh', authController.refreshToken);

module.exports = router;
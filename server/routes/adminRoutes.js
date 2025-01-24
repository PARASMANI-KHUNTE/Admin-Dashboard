// server/src/routes/adminRoutes.js
const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);

// Admin registration route (protected)
router.post('/register', registerAdmin);

module.exports = router;

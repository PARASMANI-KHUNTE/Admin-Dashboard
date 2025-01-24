// server/src/routes/regionsRoutes.js
const express = require('express');
const {
  getRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} = require('../controllers/regionsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all regions
router.get('/', authMiddleware, getRegions);

// Create a new region
router.post('/', authMiddleware, createRegion);

// Update an existing region
router.put('/:id', authMiddleware, updateRegion);

// Delete a region
router.delete('/:id', authMiddleware, deleteRegion);

module.exports = router;
// server/src/routes/hotelsRoutes.js
const express = require('express');
const { getHotels, addHotel, updateHotel, deleteHotel } = require('../controllers/hotelsController');
const router = express.Router();

router.get('/', getHotels); // Get all hotels
router.post('/', addHotel); // Add a new hotel
router.put('/:id', updateHotel); // Update an existing hotel
router.delete('/:id', deleteHotel); // Delete a hotel

module.exports = router;
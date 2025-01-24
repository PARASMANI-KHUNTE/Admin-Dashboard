// server/src/routes/vehiclesRoutes.js
const express = require('express');
const { getVehicles, addVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehiclesController');
const router = express.Router();

router.get('/', getVehicles); // Get all vehicles
router.post('/', addVehicle); // Add a new vehicle
router.put('/:id', updateVehicle); // Update an existing vehicle
router.delete('/:id', deleteVehicle); // Delete a vehicle

module.exports = router;
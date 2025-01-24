// server/src/controllers/vehiclesController.js
const Vehicle = require('../models/Vehicle');

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
  }
};

// Add a new vehicle
const addVehicle = async (req, res) => {
  try {
    const { type, price, regionId } = req.body;
    const newVehicle = new Vehicle({ type, price, regionId });
    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Error adding vehicle', error: err.message });
  }
};

// Update an existing vehicle
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, price, regionId } = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, { type, price, regionId }, { new: true });
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Error updating vehicle', error: err.message });
  }
};

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vehicle', error: err.message });
  }
};

module.exports = { getVehicles, addVehicle, updateVehicle, deleteVehicle };
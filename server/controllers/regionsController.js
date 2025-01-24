const Region = require('../models/Region');

// Get all regions
const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching regions', error: err.message });
  }
};

// Create a new region
const createRegion = async (req, res) => {
  try {
    const { name, subRegions } = req.body;
    const newRegion = new Region({ name, subRegions });
    await newRegion.save();
    res.status(201).json({ message: 'Region created successfully', region: newRegion });
  } catch (err) {
    res.status(500).json({ message: 'Error creating region', error: err.message });
  }
};

// Update an existing region
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRegion = await Region.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRegion) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json({ message: 'Region updated successfully', region: updatedRegion });
  } catch (err) {
    res.status(500).json({ message: 'Error updating region', error: err.message });
  }
};

// Delete a region
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRegion = await Region.findByIdAndDelete(id);
    if (!deletedRegion) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json({ message: 'Region deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting region', error: err.message });
  }
};

module.exports = {
  getRegions,
  createRegion,
  updateRegion,
  deleteRegion,
};

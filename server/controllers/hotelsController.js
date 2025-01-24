// server/src/controllers/hotelsController.js
const Hotel = require('../models/Hotel');

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hotels', error: err.message });
  }
};

// Add a new hotel
const addHotel = async (req, res) => {
  try {
    const { name, price, address, regionId } = req.body;
    const newHotel = new Hotel({ name, price, address, regionId });
    await newHotel.save();
    res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel });
  } catch (err) {
    res.status(500).json({ message: 'Error adding hotel', error: err.message });
  }
};

// Update an existing hotel
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, address, regionId } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, { name, price, address, regionId }, { new: true });
    if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (err) {
    res.status(500).json({ message: 'Error updating hotel', error: err.message });
  }
};

// Delete a hotel
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting hotel', error: err.message });
  }
};

module.exports = { getHotels, addHotel, updateHotel, deleteHotel };

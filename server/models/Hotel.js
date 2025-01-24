// server/src/models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Hotel', hotelSchema);
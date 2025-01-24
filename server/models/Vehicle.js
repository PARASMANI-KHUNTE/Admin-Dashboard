// server/src/models/Vehicle.js
const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Vehicle', vehicleSchema);
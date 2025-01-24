// server/src/models/Region.js
const mongoose = require('mongoose');
const regionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subRegions: [{ type: String }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Region', regionSchema);
  
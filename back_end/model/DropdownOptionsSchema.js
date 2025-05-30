const mongoose = require('mongoose');

const DropdownOptionsSchema = new mongoose.Schema({
  specialization: [String],
  location: [Number],
  language: [String],
  feeRange: [String],
  availability: [String]
}, { timestamps: true });


module.exports = mongoose.model('patientDropdown', DropdownOptionsSchema);
  
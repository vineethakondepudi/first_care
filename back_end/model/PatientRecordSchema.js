const mongoose = require('mongoose');

const PatientRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  approval: {
    type: String,
    enum: ['accept', 'decline', 'start', 'end'],
    required: true
  },
  records: {
    type: [String], // or change to Object if records are structured
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('PatientRecord', PatientRecordSchema);

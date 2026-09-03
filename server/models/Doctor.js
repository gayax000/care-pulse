const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { 
    type: String, 
    enum: ['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'General Medicine', 'Orthopedics'],
    required: true 
  },
  qualifications: { type: String, required: true },
  contactEmail: { type: String, required: true },
  consultationFee: { type: Number, required: true, min: 0 },
  availableDays: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
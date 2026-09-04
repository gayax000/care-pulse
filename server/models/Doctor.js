const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Doctor name is required'],
    trim: true,
    minlength: [3, 'Doctor name must be at least 3 characters']
  },
  specialization: { 
    type: String, 
    enum: {
      values: ['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'General Medicine', 'Orthopedics'],
      message: '{VALUE} is not a supported specialization'
    },
    required: [true, 'Specialization is required']
  },
  qualifications: { 
    type: String, 
    required: [true, 'Qualifications are required'],
    trim: true 
  },
  contactEmail: { 
    type: String, 
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  consultationFee: { 
    type: Number, 
    required: [true, 'Consultation fee is required'], 
    min: [0, 'Fee cannot be negative'] 
  },
  availableDays: { 
    type: String, 
    required: [true, 'Available days are required'],
    trim: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
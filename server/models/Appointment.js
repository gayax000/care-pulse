const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: [true, 'Patient name is required'],
    trim: true 
  },
  patientPhone: { 
    type: String, 
    required: [true, 'Patient phone number is required'],
    trim: true,
    match: [/^\d{9,10}$/, 'Phone number must be 9-10 digits']
  },
  doctorName: { 
    type: String, 
    required: [true, 'Doctor name is required'],
    trim: true 
  },
  appointmentDate: { 
    type: String, 
    required: [true, 'Appointment date is required'] 
  },
  timeSlot: { 
    type: String, 
    required: [true, 'Time slot is required'] 
  },
  status: { 
    type: String, 
    enum: {
      values: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      message: '{VALUE} is not a valid status'
    }, 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
const mongoose = require('mongoose');
 
const feedbackSchema = new mongoose.Schema({
  patientName: { 
    type: String, 
    required: [true, 'Patient name is required'],
    trim: true 
  },
  doctorOrService: { 
    type: String, 
    required: [true, 'Doctor or service name is required'],
    trim: true 
  },
  rating: { 
    type: Number, 
    required: [true, 'Rating is required'], 
    min: [1, 'Rating must be at least 1 star'], 
    max: [5, 'Rating cannot exceed 5 stars'] 
  },
  comments: { 
    type: String, 
    required: [true, 'Patient comments are required'],
    trim: true 
  },
  symptomsInquiry: { type: String, default: '', trim: true },
  recommend: { type: Boolean, default: true }
}, { timestamps: true });
 
module.exports = mongoose.model('Feedback', feedbackSchema);
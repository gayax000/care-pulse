const mongoose = require('mongoose');
 
const feedbackSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorOrService: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: true },
  symptomsInquiry: { type: String, default: '' },
  recommend: { type: Boolean, default: true }
}, { timestamps: true });
 
module.exports = mongoose.model('Feedback', feedbackSchema);
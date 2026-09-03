const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Antibiotics', 'Pain Relief', 'Vitamins & Supplements', 'Cardiovascular', 'Respiratory', 'Other'],
    required: true 
  },
  stockQuantity: { type: Number, required: true, min: 0 },
  unitPrice: { type: Number, required: true, min: 0 },
  expiryDate: { type: String, required: true },
  manufacturer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
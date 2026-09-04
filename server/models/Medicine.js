const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineName: { 
    type: String, 
    required: [true, 'Medicine name is required'],
    trim: true 
  },
  category: { 
    type: String, 
    enum: {
      values: ['Antibiotics', 'Pain Relief', 'Vitamins & Supplements', 'Cardiovascular', 'Respiratory', 'Other'],
      message: '{VALUE} is not a valid medicine category'
    },
    required: [true, 'Category is required'] 
  },
  stockQuantity: { 
    type: Number, 
    required: [true, 'Stock quantity is required'], 
    min: [0, 'Stock quantity cannot be negative'] 
  },
  unitPrice: { 
    type: Number, 
    required: [true, 'Unit price is required'], 
    min: [0, 'Unit price cannot be negative'] 
  },
  expiryDate: { 
    type: String, 
    required: [true, 'Expiry date is required'] 
  },
  manufacturer: { 
    type: String, 
    required: [true, 'Manufacturer is required'],
    trim: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
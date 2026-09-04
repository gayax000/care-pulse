const Medicine = require('../models/Medicine');

// 1. Get all medicines
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find().sort({ createdAt: -1 });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Add new medicine
exports.createMedicine = async (req, res) => {
  try {
    const { medicineName, category, stockQuantity, unitPrice, expiryDate, manufacturer } = req.body;
    
    if (!medicineName || !medicineName.trim()) return res.status(400).json({ error: 'Medicine name is required' });
    if (!category || !category.trim()) return res.status(400).json({ error: 'Category is required' });
    if (stockQuantity === undefined || stockQuantity < 0) return res.status(400).json({ error: 'Valid non-negative stock quantity is required' });
    if (unitPrice === undefined || unitPrice < 0) return res.status(400).json({ error: 'Valid non-negative unit price is required' });
    if (!expiryDate || !expiryDate.trim()) return res.status(400).json({ error: 'Expiry date is required' });
    if (!manufacturer || !manufacturer.trim()) return res.status(400).json({ error: 'Manufacturer is required' });

    const newMed = new Medicine({
      medicineName: medicineName.trim(),
      category: category.trim(),
      stockQuantity: Number(stockQuantity),
      unitPrice: Number(unitPrice),
      expiryDate: expiryDate.trim(),
      manufacturer: manufacturer.trim()
    });

    await newMed.save();
    res.status(201).json(newMed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update medicine stock / price
exports.updateMedicine = async (req, res) => {
  try {
    if (req.body.stockQuantity !== undefined && req.body.stockQuantity < 0) {
      return res.status(400).json({ error: 'Stock quantity cannot be negative' });
    }
    if (req.body.unitPrice !== undefined && req.body.unitPrice < 0) {
      return res.status(400).json({ error: 'Unit price cannot be negative' });
    }
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Medicine record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Medicine record not found' });
    res.json({ message: 'Medicine removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
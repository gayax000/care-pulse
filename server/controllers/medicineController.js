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
    if (!medicineName || !category || stockQuantity === undefined || unitPrice === undefined || !expiryDate || !manufacturer) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newMed = new Medicine(req.body);
    await newMed.save();
    res.status(201).json(newMed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update medicine stock / price
exports.updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
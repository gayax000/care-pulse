const Doctor = require('../models/Doctor');

// 1. Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Create new doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, qualifications, contactEmail, consultationFee, availableDays } = req.body;
    if (!name || !specialization || !qualifications || !contactEmail || consultationFee === undefined || !availableDays) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newDoc = new Doctor(req.body);
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
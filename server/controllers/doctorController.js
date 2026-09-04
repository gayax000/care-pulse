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
    
    // Sanitize & validate required fields
    if (!name || !name.trim()) return res.status(400).json({ error: 'Doctor name is required' });
    if (!specialization || !specialization.trim()) return res.status(400).json({ error: 'Specialization is required' });
    if (!qualifications || !qualifications.trim()) return res.status(400).json({ error: 'Qualifications are required' });
    if (!contactEmail || !contactEmail.trim()) return res.status(400).json({ error: 'Contact email is required' });
    if (consultationFee === undefined || consultationFee < 0) return res.status(400).json({ error: 'Valid positive consultation fee is required' });
    if (!availableDays || !availableDays.trim()) return res.status(400).json({ error: 'Available days are required' });

    const newDoc = new Doctor({
      name: name.trim(),
      specialization: specialization.trim(),
      qualifications: qualifications.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      consultationFee: Number(consultationFee),
      availableDays: availableDays.trim()
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    if (req.body.consultationFee !== undefined && req.body.consultationFee < 0) {
      return res.status(400).json({ error: 'Consultation fee cannot be negative' });
    }
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Doctor profile not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Doctor profile not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
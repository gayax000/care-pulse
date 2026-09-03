const Appointment = require('../models/Appointment');

// 1. Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const apps = await Appointment.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Book new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientName, patientPhone, doctorName, appointmentDate, timeSlot } = req.body;
    if (!patientName || !patientPhone || !doctorName || !appointmentDate || !timeSlot) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newApp = new Appointment(req.body);
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
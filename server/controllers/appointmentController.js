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
    const { patientName, patientPhone, doctorName, appointmentDate, timeSlot, status } = req.body;
    
    if (!patientName || !patientName.trim()) return res.status(400).json({ error: 'Patient name is required' });
    if (!patientPhone || !patientPhone.trim()) return res.status(400).json({ error: 'Patient phone number is required' });
    if (!doctorName || !doctorName.trim()) return res.status(400).json({ error: 'Doctor name is required' });
    if (!appointmentDate || !appointmentDate.trim()) return res.status(400).json({ error: 'Appointment date is required' });
    if (!timeSlot || !timeSlot.trim()) return res.status(400).json({ error: 'Time slot is required' });

    const newApp = new Appointment({
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      doctorName: doctorName.trim(),
      appointmentDate: appointmentDate.trim(),
      timeSlot: timeSlot.trim(),
      status: status || 'Pending'
    });

    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Appointment not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
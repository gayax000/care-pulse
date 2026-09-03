import React, { useState, useEffect } from 'react';

export default function AppointmentModal({ isOpen, onClose, onSave, editingApp }) {
  const [formData, setFormData] = useState({
    patientName: '', patientPhone: '', doctorName: '', appointmentDate: '', timeSlot: '05:00 PM', status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApp) setFormData(editingApp);
    else setFormData({ patientName: '', patientPhone: '', doctorName: '', appointmentDate: '', timeSlot: '05:00 PM', status: 'Pending' });
    setErrors({});
  }, [editingApp, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = 'Patient name is required';
    if (!formData.patientPhone.trim() || formData.patientPhone.length < 9) {
      errs.patientPhone = 'Valid contact number is required';
    }
    if (!formData.doctorName.trim()) errs.doctorName = 'Doctor name is required';
    if (!formData.appointmentDate.trim()) errs.appointmentDate = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingApp ? '📑 Edit Appointment' : '📑 Book Patient Appointment'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Patient Full Name</label>
            <input className="form-control" placeholder="Nimal Silva" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} />
            {errors.patientName && <div className="error-text">{errors.patientName}</div>}
          </div>
          <div className="form-group">
            <label>Contact Phone</label>
            <input className="form-control" placeholder="0771234567" value={formData.patientPhone} onChange={e => setFormData({...formData, patientPhone: e.target.value})} />
            {errors.patientPhone && <div className="error-text">{errors.patientPhone}</div>}
          </div>
          <div className="form-group">
            <label>Doctor / Consultant</label>
            <input className="form-control" placeholder="Dr. Kasun Perera" value={formData.doctorName} onChange={e => setFormData({...formData, doctorName: e.target.value})} />
            {errors.doctorName && <div className="error-text">{errors.doctorName}</div>}
          </div>
          <div className="form-group">
            <label>Appointment Date</label>
            <input type="date" className="form-control" value={formData.appointmentDate} onChange={e => setFormData({...formData, appointmentDate: e.target.value})} />
            {errors.appointmentDate && <div className="error-text">{errors.appointmentDate}</div>}
          </div>
          <div className="form-group">
            <label>Preferred Time Slot</label>
            <select className="form-control" value={formData.timeSlot} onChange={e => setFormData({...formData, timeSlot: e.target.value})}>
              <option>04:30 PM</option>
              <option>05:00 PM</option>
              <option>05:30 PM</option>
              <option>06:00 PM</option>
              <option>06:30 PM</option>
              <option>07:00 PM</option>
            </select>
          </div>
          {editingApp && (
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingApp ? 'Update Status' : 'Confirm Booking'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
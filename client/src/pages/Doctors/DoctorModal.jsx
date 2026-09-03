import React, { useState, useEffect } from 'react';

export default function DoctorModal({ isOpen, onClose, onSave, editingDoc }) {
  const [formData, setFormData] = useState({
    name: '', specialization: 'General Medicine', qualifications: '', contactEmail: '', consultationFee: '', availableDays: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingDoc) setFormData(editingDoc);
    else setFormData({ name: '', specialization: 'General Medicine', qualifications: '', contactEmail: '', consultationFee: '', availableDays: '' });
    setErrors({});
  }, [editingDoc, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Doctor name is required';
    if (!formData.qualifications.trim()) errs.qualifications = 'Qualifications are required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail)) {
      errs.contactEmail = 'Valid contact email is required';
    }
    if (!formData.consultationFee || formData.consultationFee < 0) {
      errs.consultationFee = 'Valid fee is required';
    }
    if (!formData.availableDays.trim()) errs.availableDays = 'Available days are required';
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
        <h3>{editingDoc ? '🩺 Edit Doctor Profile' : '🩺 Add New Doctor'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Doctor Name</label>
            <input className="form-control" placeholder="Dr. Kasun Perera" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <select className="form-control" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})}>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Dermatology</option>
              <option>Pediatrics</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
            </select>
          </div>
          <div className="form-group">
            <label>Qualifications / Degrees</label>
            <input className="form-control" placeholder="MBBS, MD, MRCP (UK)" value={formData.qualifications} onChange={e => setFormData({...formData, qualifications: e.target.value})} />
            {errors.qualifications && <div className="error-text">{errors.qualifications}</div>}
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" className="form-control" placeholder="doctor@carepulse.lk" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
            {errors.contactEmail && <div className="error-text">{errors.contactEmail}</div>}
          </div>
          <div className="form-group">
            <label>Consultation Fee (Rs.)</label>
            <input type="number" min="0" className="form-control" placeholder="2500" value={formData.consultationFee} onChange={e => setFormData({...formData, consultationFee: Number(e.target.value)})} />
            {errors.consultationFee && <div className="error-text">{errors.consultationFee}</div>}
          </div>
          <div className="form-group">
            <label>Available Days & Time</label>
            <input className="form-control" placeholder="Mon, Wed, Fri (4:00 PM - 8:00 PM)" value={formData.availableDays} onChange={e => setFormData({...formData, availableDays: e.target.value})} />
            {errors.availableDays && <div className="error-text">{errors.availableDays}</div>}
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingDoc ? 'Update Doctor' : 'Save Doctor'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
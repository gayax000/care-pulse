import React, { useState, useEffect } from 'react';
 
export default function FeedbackModal({ isOpen, onClose, onSave, editingFb }) {
  const [formData, setFormData] = useState({
    patientName: '', doctorOrService: '', rating: 5, comments: '', symptomsInquiry: '', recommend: true
  });
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (editingFb) setFormData(editingFb);
    else setFormData({ patientName: '', doctorOrService: '', rating: 5, comments: '', symptomsInquiry: '', recommend: true });
    setErrors({});
  }, [editingFb, isOpen]);
 
  if (!isOpen) return null;
 
  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Patient name is required';
    }
    if (!formData.doctorOrService.trim()) {
      errs.doctorOrService = 'Doctor or department name is required';
    }
    if (!formData.comments.trim() || formData.comments.trim().length < 5) {
      errs.comments = 'Please enter at least 5 characters of feedback comments';
    }
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
        <h3>{editingFb ? '⭐ Edit Feedback' : '⭐ Submit Patient Experience & Feedback'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="form-group">
            <label>Patient Name <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required
              placeholder="Amal Silva" 
              value={formData.patientName} 
              onChange={e => setFormData({...formData, patientName: e.target.value})} 
            />
            {errors.patientName && <div className="error-text">{errors.patientName}</div>}
          </div>
          <div className="form-group">
            <label>Doctor / Department Consulted <span style={{ color: 'red' }}>*</span></label>
            <input 
              className="form-control" 
              required
              placeholder="Dr. Kasun Perera (Cardiology)" 
              value={formData.doctorOrService} 
              onChange={e => setFormData({...formData, doctorOrService: e.target.value})} 
            />
            {errors.doctorOrService && <div className="error-text">{errors.doctorOrService}</div>}
          </div>
          <div className="form-group">
            <label>Rating (1 to 5 Stars) <span style={{ color: 'red' }}>*</span></label>
            <select className="form-control" required value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})}>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent Care</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="3">⭐⭐⭐ 3 - Average</option>
              <option value="2">⭐⭐ 2 - Poor</option>
              <option value="1">⭐ 1 - Very Bad</option>
            </select>
          </div>
          <div className="form-group">
            <label>Patient Experience & Comments <span style={{ color: 'red' }}>*</span></label>
            <textarea 
              rows="3" 
              className="form-control" 
              required
              minLength={5}
              placeholder="Doctor was very attentive and treatment was effective..." 
              value={formData.comments} 
              onChange={e => setFormData({...formData, comments: e.target.value})} 
            />
            {errors.comments && <div className="error-text">{errors.comments}</div>}
          </div>
          <div className="form-group">
            <label>Follow-up Symptom Inquiry (Optional)</label>
            <input 
              className="form-control" 
              placeholder="Any mild side effects or recovery questions" 
              value={formData.symptomsInquiry} 
              onChange={e => setFormData({...formData, symptomsInquiry: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="recCheck" checked={formData.recommend} onChange={e => setFormData({...formData, recommend: e.target.checked})} />
            <label htmlFor="recCheck" style={{ margin: 0, fontWeight: 500 }}>I recommend this clinic to other patients</label>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editingFb ? 'Update Review' : 'Submit Review'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
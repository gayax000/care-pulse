import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import FeedbackModal from './FeedbackModal';
 
export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFb, setEditingFb] = useState(null);
 
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/feedbacks`);
      setFeedbacks(res.data);
    } catch (err) { console.error(err); }
  };
 
  useEffect(() => { fetchFeedbacks(); }, []);
 
  const handleSave = async (formData) => {
    try {
      if (editingFb) {
        await axios.put(`${API_BASE_URL}/api/feedbacks/${editingFb._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/feedbacks`, formData);
      }
      setIsModalOpen(false);
      setEditingFb(null);
      fetchFeedbacks();
    } catch (err) { alert(err.response?.data?.error || 'Error saving feedback'); }
  };
 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/feedbacks/${id}`);
        fetchFeedbacks();
      } catch (err) { console.error(err); }
    }
  };
 
  return (
<div className="container">
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
<div>
<h2>⭐ Patient Feedback & Ratings ({feedbacks.length})</h2>
<p style={{ color: '#64748b' }}>Authentic reviews and treatment recovery experiences</p>
</div>
<button className="btn btn-primary" onClick={() => { setEditingFb(null); setIsModalOpen(true); }}>
          + Write a Review
</button>
</div>
 
      <div className="card-grid">
        {feedbacks.map(fb => (
<div key={fb._id} className="card" style={{ borderTop: '4px solid #f43f5e' }}>
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
<h3 style={{ color: '#0f172a' }}>{fb.patientName}</h3>
<span>{'⭐'.repeat(fb.rating)}</span>
</div>
<p style={{ color: '#0284c7', fontSize: '13px', fontWeight: 600, margin: '4px 0' }}>🩺 {fb.doctorOrService}</p>
<p style={{ color: '#334155', fontSize: '14px', margin: '10px 0' }}>"{fb.comments}"</p>
              {fb.symptomsInquiry && (
<p style={{ fontSize: '12px', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px', color: '#64748b' }}>
                  💬 <strong>Inquiry:</strong> {fb.symptomsInquiry}
</p>
              )}
</div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px' }}>
<span style={{ fontSize: '12px', color: fb.recommend ? '#166534' : '#991b1b', fontWeight: 600 }}>
                {fb.recommend ? '✓ Recommended' : '✗ Not Recommended'}
</span>
<div style={{ display: 'flex', gap: '6px' }}>
<button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingFb(fb); setIsModalOpen(true); }}>Edit</button>
<button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(fb._id)}>Delete</button>
</div>
</div>
</div>
        ))}
</div>
 
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingFb={editingFb} />
</div>
  );
}
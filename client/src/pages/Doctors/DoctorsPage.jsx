import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import DoctorModal from './DoctorModal';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/doctors`);
      setDoctors(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingDoc) {
        await axios.put(`${API_BASE_URL}/api/doctors/${editingDoc._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/doctors`, formData);
      }
      setIsModalOpen(false);
      setEditingDoc(null);
      fetchDoctors();
    } catch (err) { alert(err.response?.data?.error || 'Error saving doctor'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this doctor profile?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/doctors/${id}`);
        fetchDoctors();
      } catch (err) { console.error(err); }
    }
  };

  const filtered = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>🩺 Doctors & Specialists ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Qualified medical practitioners and clinical consultants</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingDoc(null); setIsModalOpen(true); }}>
          + Register Doctor
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="🔍 Search doctors by name or specialization..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="card-grid">
        {filtered.map(doc => (
          <div key={doc._id} className="card" style={{ borderTop: '4px solid #0284c7' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {doc.specialization}
                </span>
                <span style={{ color: '#059669', fontWeight: 700, fontSize: '14px' }}>Rs. {doc.consultationFee}</span>
              </div>
              <h3 style={{ marginTop: '10px', color: '#0f172a' }}>{doc.name}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0' }}>🎓 {doc.qualifications}</p>
              <p style={{ color: '#0284c7', fontSize: '13px', fontWeight: 500 }}>✉️ {doc.contactEmail}</p>
              <p style={{ color: '#334155', fontSize: '13px', marginTop: '8px', background: '#f8fafc', padding: '6px 10px', borderRadius: '6px' }}>
                🕒 {doc.availableDays}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px' }}>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setEditingDoc(doc); setIsModalOpen(true); }}>Edit</button>
              <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(doc._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <DoctorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingDoc={editingDoc} />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import MedicineModal from './MedicineModal';

export default function PharmacyPage() {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/medicines`);
      setMedicines(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMedicines(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingMed) {
        await axios.put(`${API_BASE_URL}/api/medicines/${editingMed._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/medicines`, formData);
      }
      setIsModalOpen(false);
      setEditingMed(null);
      fetchMedicines();
    } catch (err) { alert(err.response?.data?.error || 'Error saving medicine'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine record?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/medicines/${id}`);
        fetchMedicines();
      } catch (err) { console.error(err); }
    }
  };

  const filtered = medicines.filter(m => 
    m.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>💊 Pharmacy & Medicine Stock ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Manage medicine availability, pricing, and expiration dates</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingMed(null); setIsModalOpen(true); }}>
          + Add Medicine
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="🔍 Search medicine by name or category..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="card-grid">
        {filtered.map(med => (
          <div key={med._id} className="card" style={{ borderTop: '4px solid #f59e0b' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {med.category}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: med.stockQuantity < 20 ? '#dc2626' : '#059669' }}>
                  📦 {med.stockQuantity} In Stock
                </span>
              </div>
              <h3 style={{ marginTop: '10px', color: '#0f172a' }}>{med.medicineName}</h3>
              <p style={{ color: '#0284c7', fontWeight: 700, margin: '6px 0' }}>Rs. {med.unitPrice} per unit</p>
              <p style={{ color: '#64748b', fontSize: '13px' }}>🏭 {med.manufacturer}</p>
              <p style={{ color: '#ef4444', fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>⏳ Expires: {med.expiryDate}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px' }}>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setEditingMed(med); setIsModalOpen(true); }}>Edit</button>
              <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(med._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <MedicineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingMed={editingMed} />
    </div>
  );
}
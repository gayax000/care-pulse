import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api';
import AppointmentModal from './AppointmentModal';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/appointments`);
      setAppointments(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingApp) {
        await axios.put(`${API_BASE_URL}/api/appointments/${editingApp._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/appointments`, formData);
      }
      setIsModalOpen(false);
      setEditingApp(null);
      fetchAppointments();
    } catch (err) { alert(err.response?.data?.error || 'Error saving appointment'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel and remove this booking?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/appointments/${id}`);
        fetchAppointments();
      } catch (err) { console.error(err); }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': { bg: '#fef3c7', text: '#92400e' },
      'Confirmed': { bg: '#dcfce7', text: '#166534' },
      'Completed': { bg: '#e0f2fe', text: '#0369a1' },
      'Cancelled': { bg: '#fee2e2', text: '#991b1b' }
    };
    const s = colors[status] || { bg: '#f1f5f9', text: '#475569' };
    return <span style={{ background: s.bg, color: s.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{status}</span>;
  };

  const filtered = appointments.filter(a => filterStatus === 'All' || a.status === filterStatus);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>📑 Patient Appointments ({filtered.length})</h2>
          <p style={{ color: '#64748b' }}>Schedule and track patient consultation sessions</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingApp(null); setIsModalOpen(true); }}>
          + Book Appointment
        </button>
      </div>

      <div style={{ margin: '20px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(st => (
          <button key={st} onClick={() => setFilterStatus(st)} className="btn" style={{
            fontSize: '13px', padding: '6px 12px',
            background: filterStatus === st ? '#0284c7' : '#e2e8f0',
            color: filterStatus === st ? 'white' : '#334155'
          }}>
            {st}
          </button>
        ))}
      </div>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
              <th style={{ padding: '12px' }}>Patient</th>
              <th style={{ padding: '12px' }}>Phone</th>
              <th style={{ padding: '12px' }}>Consultant</th>
              <th style={{ padding: '12px' }}>Date & Slot</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(app => (
              <tr key={app._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>{app.patientName}</td>
                <td style={{ padding: '12px' }}>{app.patientPhone}</td>
                <td style={{ padding: '12px', color: '#0284c7', fontWeight: 600 }}>{app.doctorName}</td>
                <td style={{ padding: '12px' }}>📅 {app.appointmentDate} ({app.timeSlot})</td>
                <td style={{ padding: '12px' }}>{getStatusBadge(app.status)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { setEditingApp(app); setIsModalOpen(true); }}>Edit</button>
                    <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDelete(app._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingApp={editingApp} />
    </div>
  );
}
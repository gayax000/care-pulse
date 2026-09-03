import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

export default function Home() {
  const [stats, setStats] = useState({ doctors: 0, appointments: 0, medicines: 0, feedback: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [d, a, m, f] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/doctors`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/appointments`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/medicines`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/feedbacks`).catch(() => ({ data: [] }))
        ]);
        setStats({ doctors: d.data.length, appointments: a.data.length, medicines: m.data.length, feedback: f.data.length });
      } catch (err) { console.error(err); }
    };
    fetchCounts();
  }, []);

  return (
    <div className="container">
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0f172a 100%)',
        borderRadius: '24px', padding: '48px 32px', color: 'white', textAlign: 'center',
        boxShadow: '0 20px 30px -10px rgba(12, 74, 110, 0.4)', marginBottom: '36px'
      }}>
        <span style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc', border: '1px solid rgba(125, 211, 252, 0.3)', padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
          ⚡ University Mini Hackathon 2026 Edition
        </span>
        <h1 style={{ fontSize: '38px', color: '#ffffff', fontWeight: 800, marginBottom: '14px' }}>
          Smart Healthcare Management with <span style={{ color: '#38bdf8' }}>CarePulse</span>
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '720px', margin: '0 auto 28px' }}>
          An all-in-one clinical operations portal connecting patients with specialist doctors, live appointment scheduling, pharmacy inventory, and authentic treatment ratings.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/doctors" className="btn btn-primary">🩺 Browse Specialist Doctors</Link>
          <Link to="/appointments" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>📑 Book Consultation</Link>
        </div>
      </div>

      {/* Live Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '40px' }}>
        {[
          { label: 'Registered Doctors', value: stats.doctors, icon: '🩺', color: '#0284c7' },
          { label: 'Patient Bookings', value: stats.appointments, icon: '📑', color: '#059669' },
          { label: 'Pharmacy Stock', value: stats.medicines, icon: '💊', color: '#d97706' },
          { label: 'Patient Reviews', value: stats.feedback, icon: '⭐', color: '#e11d48' }
        ].map(item => (
          <div key={item.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: item.color }}>{item.value}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Modules Cards */}
      <h2>Core Healthcare Modules</h2>
      <div className="card-grid">
        <div className="card" style={{ borderTop: '4px solid #0284c7' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', background: '#e0f2fe', padding: '3px 8px', borderRadius: '4px' }}>MEMBER 1</span>
            <h3 style={{ marginTop: '8px' }}>Doctors & Specialists</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Doctor profiles, specializations, consulting fees, and scheduling.</p>
          </div>
          <Link to="/doctors" className="btn btn-primary" style={{ marginTop: '16px' }}>Explore Doctors →</Link>
        </div>
        <div className="card" style={{ borderTop: '4px solid #10b981' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', background: '#d1fae5', padding: '3px 8px', borderRadius: '4px' }}>MEMBER 2</span>
            <h3 style={{ marginTop: '8px' }}>Appointment Scheduling</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Patient consultation booking, time slot allocation, and status tracking.</p>
          </div>
          <Link to="/appointments" className="btn btn-primary" style={{ marginTop: '16px', background: '#059669' }}>Manage Bookings →</Link>
        </div>
        <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '4px' }}>MEMBER 3</span>
            <h3 style={{ marginTop: '8px' }}>Pharmacy & Medicines</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Medicine inventory, stock counts, batch expiry, and unit pricing.</p>
          </div>
          <Link to="/pharmacy" className="btn btn-primary" style={{ marginTop: '16px', background: '#d97706' }}>Pharmacy Inventory →</Link>
        </div>
        <div className="card" style={{ borderTop: '4px solid #f43f5e' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#db2777', background: '#ffe4e6', padding: '3px 8px', borderRadius: '4px' }}>MEMBER 4</span>
            <h3 style={{ marginTop: '8px' }}>Patient Experience</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Treatment reviews, star ratings, and symptom inquiries.</p>
          </div>
          <Link to="/feedback" className="btn btn-primary" style={{ marginTop: '16px', background: '#e11d48' }}>Read Feedback →</Link>
        </div>
      </div>
    </div>
  );
}
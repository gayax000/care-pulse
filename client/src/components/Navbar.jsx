import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (p) => location.pathname === p;

  return (
    <header style={{
      background: 'linear-gradient(90deg, #0f172a 0%, #0369a1 50%, #0f172a 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.25)'
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 20px', height: '68px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '18px' }}>
            🏥
          </div>
          <div>
            <span style={{ fontSize: '19px', fontWeight: '800', color: '#ffffff' }}>Care<span style={{ color: '#38bdf8' }}>Pulse</span></span>
            <span style={{ display: 'block', fontSize: '10px', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase' }}>Smart Clinic Hub</span>
          </div>
        </Link>
        <nav style={{ display: 'flex', gap: '6px' }}>
          {[
            { path: '/', label: 'Overview' },
            { path: '/doctors', label: '🩺 Doctors' },
            { path: '/appointments', label: '📑 Appointments' },
            { path: '/pharmacy', label: '💊 Pharmacy' },
            { path: '/feedback', label: '⭐ Feedback' }
          ].map(item => (
            <Link key={item.path} to={item.path} style={{
              textDecoration: 'none', fontSize: '13.5px', fontWeight: isActive(item.path) ? 700 : 500,
              color: isActive(item.path) ? '#ffffff' : '#cbd5e1',
              background: isActive(item.path) ? 'rgba(2, 132, 199, 0.35)' : 'transparent',
              border: isActive(item.path) ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
              padding: '7px 14px', borderRadius: '10px'
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
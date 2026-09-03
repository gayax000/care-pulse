import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '28px 20px', textAlign: 'center', fontSize: '13.5px', color: '#94a3b8'
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <p style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '6px', fontSize: '15px' }}>
          🏥 CarePulse • University Mini Hackathon 2026
        </p>
        <p style={{ color: '#64748b' }}>
          Built with MongoDB Atlas, Express.js, React.js & Node.js (MERN Stack)
        </p>
      </div>
    </footer>
  );
}
const API_BASE_URL = 
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://care-pulse-production-10bf.up.railway.app'; // 👈 මෙතනට ඔයාගේ අලුත් CarePulse Railway URL එක දාන්න

export default API_BASE_URL;
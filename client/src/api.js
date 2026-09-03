const API_BASE_URL = 
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'http://care-pulse-production-10bf.up.railway.app'; // හෝ ඔයාගේ Live Railway URL එක

export default API_BASE_URL;
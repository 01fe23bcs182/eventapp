// This script updates API URLs for Render deployment
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'frontend/src/context/AuthContext.js',
  'frontend/src/components/AdminDashboard.js',
  'frontend/src/components/EventList.js',
  'frontend/src/components/MyBookings.js',
  'frontend/src/components/AdminBookings.js'
];

const backendUrl = 'https://event-app-backend.onrender.com';

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace localhost with Render URL
  content = content.replace(/http:\/\/localhost:5000/g, backendUrl);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});

console.log('✅ API URLs updated for Render deployment');

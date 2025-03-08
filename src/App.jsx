import React from 'react';
import ReactDOM from 'react-dom/client';
import Upload from './Upload.jsx'; // เปลี่ยนจาก App.jsx เป็น Home.jsx
import './Upload.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Upload />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage.jsx'; // เปลี่ยนจาก App.jsx เป็น Home.jsx
import './HomePage.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
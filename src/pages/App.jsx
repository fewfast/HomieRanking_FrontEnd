import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Upload from './Upload';
import Gamepage from './Gamepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/gamepage" element={<Gamepage />} />
      </Routes>
    </Router>
  );
}

export default App;

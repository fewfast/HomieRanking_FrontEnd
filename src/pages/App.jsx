import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Upload from './Upload';
import Gamepage from './Gamepage';
import { CategoriesProvider } from "./CategoriesContext";
import { DataProvider } from "./DataContentContext";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/gamepage" element={<Gamepage />} />
            </Routes>
          </Router>
        </DataProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;

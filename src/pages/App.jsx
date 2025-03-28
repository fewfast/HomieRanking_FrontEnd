import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Upload from './Upload';
import Gamepage from './Gamepage';
import ProfilePage from './ProfilePage';
import UpdatePage from './UpdatePage';
import OtherProfilePage from './OtherProfilePage';
import { CategoriesProvider } from "./CategoriesContext";
import { DataProvider } from "./DataContentContext";
import { AuthProvider } from "./AuthContext";
import { APIProvider } from './APIContext'; 

function App() {
  return (
    <APIProvider>
      <AuthProvider>
        <CategoriesProvider>
          <DataProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/gamepage" element={<Gamepage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/update" element={<UpdatePage />} />
                  <Route path="/otherprofile" element={<OtherProfilePage />}/>
                </Routes>
              </Router>
          </DataProvider>
        </CategoriesProvider>
      </AuthProvider>
    </APIProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDataPage from './Pages/userDataPage';
import LandingPage from './Pages/LandingPage';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/employeeDetail" element={<UserDataPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

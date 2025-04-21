import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar'; // Adjust path if needed
import LoginPage from './components/LoginPage'; // Adjust path if needed
import RegisterPage from './components/RegisterPage'; // Adjust path if needed
import Home from './components/Home'; // Import the new Home component


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
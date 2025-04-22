import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Make sure this imports your CSS file

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Place the H1 (site name) BEFORE the UL (links) */}
      <h1>
         Pokupki.TE {/* Your site name */}
         {/* Add your logo image tag here later if you have one */}
         {/* <img src="/path/to/your/logo.png" alt="Pokupki.TE Logo" className="logo" /> */}
      </h1>

      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="nav-logout-button">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            </li>
             <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

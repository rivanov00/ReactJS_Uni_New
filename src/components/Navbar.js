import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>
        <img src="/logo.png" alt="Pokupki.TE Logo" className="site-logo" />
        Pokupki.TE
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
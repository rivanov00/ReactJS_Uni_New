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
      {/* Place the H1 (site name) BEFORE the UL (links) for left/right layout */}
      <h1>
         {/* Add your logo image tag here */}
         {/* The src path is relative to the 'public' folder */}
         <img src="/logo.png" alt="Pokupki.TE Logo" className="site-logo" /> {/* Added img tag and class */}
         Pokupki.TE {/* Your site name */}
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

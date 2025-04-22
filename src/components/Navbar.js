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
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
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
              <NavLink to="/login" activeClassName="active">Login</NavLink>
            </li>
             <li>
              <NavLink to="/register" activeClassName="active">Register</NavLink>
            </li>
          </>
        )}
      </ul>
      <h1>RadostinIvanovFN320</h1>
    </nav>
  );
}

export default Navbar;
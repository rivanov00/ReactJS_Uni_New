import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" activeclassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeclassName="active">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register" activeclassName="active">Register</NavLink>
        </li>
      </ul>

      <h1>RadostinIvanovFN320</h1>
    </nav>
  );
}

export default Navbar;
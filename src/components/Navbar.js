import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>RadostinIvanovFN320</h1>
      <ul>
        <li>
          {/* link to homepage (create later) */}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {/* here we can add more navigation links if needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
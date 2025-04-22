import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css'; // Import the CSS file for styling

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Attempting login with:', { usernameOrEmail });

    try {
      // Fetch users from the mock API
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        alert('An error occurred while trying to log in. Please try again.');
        return;
      }
      const users = await response.json();

      // Find user by username or email and check password
      const foundUser = users.find(user =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
      );

      if (foundUser) {
        // If user found, log them in and navigate to home
        login(foundUser);
        alert('Login successful!'); // Consider using state for messages instead of alert
        navigate('/');

      } else {
        // If user not found or password incorrect
        alert('Invalid username/email or password.'); // Consider using state for messages instead of alert
      }

    } catch (error) {
      // Handle network or other errors
      console.error('Login attempt failed:', error);
      alert('An error occurred during login.'); // Consider using state for messages instead of alert
    }

    // Clear password field after attempt
    setPassword('');
  };

  return (
    // Main container div with class for styling
    <div className="login-container">
      {/* Heading with class for styling */}
      <h2 className="login-title">Login Page</h2>
      {/* Form with class for styling */}
      <form onSubmit={handleSubmit} className="login-form">
        {/* Form group div with class for styling */}
        <div className="form-group">
          {/* Label with class for styling */}
          <label htmlFor="login-username-email" className="login-label">Username or Email:</label>
          {/* Input with class for styling */}
          <input
            type="text"
            id="login-username-email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="login-input" // Added class
            required
          />
        </div>
        {/* Form group div with class for styling */}
        <div className="form-group">
          {/* Label with class for styling */}
          <label htmlFor="login-password" className="login-label">Password:</label>
          {/* Input with class for styling */}
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input" // Added class
            required
          />
        </div>
        {/* Submit button with class for styling */}
        <button type="submit" className="login-button">Login</button>
      </form>

      {/* Paragraph with link, using register-link class for consistency */}
      <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;

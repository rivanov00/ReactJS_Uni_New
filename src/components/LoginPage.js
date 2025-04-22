import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Attempting login with:', { usernameOrEmail });

    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        alert('An error occurred while trying to log in. Please try again.');
        return;
      }
      const users = await response.json();

      const foundUser = users.find(user =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
      );

      if (foundUser) {
        login(foundUser);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Invalid username/email or password.');
      }
    } catch (error) {
      console.error('Login attempt failed:', error);
      alert('An error occurred during login.');
    }
    setPassword('');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="login-username-email" className="login-label">Username or Email:</label>
          <input
            type="text"
            id="login-username-email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="login-label">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;
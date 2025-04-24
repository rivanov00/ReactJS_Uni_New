import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/LoginPage.css';

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('http://localhost:5000/users');

      if (!response.ok) {
        setMessage('An error occurred while trying to log in. Please try again.');
        setMessageType('error');
        return;
      }

      const users = await response.json();

      const foundUser = users.find(user =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
      );

      if (foundUser) {
        login(foundUser);
        setMessage('Login successful, you will be redirected to your shopping list.');
        setMessageType('success');

        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else {
        setMessage('Invalid username/email or password.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>

      {message && (
        <p className={`login-message ${messageType}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <p className="login-info-message">
          The website is for authorized users only
        </p>

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

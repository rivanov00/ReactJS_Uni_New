import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');

    const errors = [];

    if (password !== confirmPassword) {
      errors.push("Passwords do not match!");
    }

    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long.`);
    }

    if (!hasUppercase) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!hasSpecialChar) {
      errors.push("Password must contain at least one special character.");
    }

    if (errors.length > 0) {
      setMessage("Password requirements not met:\n\n" + errors.join('\n'));
      setMessageType('error');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const newUser = { username, email, password };

      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        setMessage(`Registration failed: ${errorData.message || response.statusText}`);
        setMessageType('error');
        return;
      }

      const registeredUser = await response.json();
      console.log('Registration successful:', registeredUser);

      setMessage('Registration successful! You will be redirected to the login page.');
      setMessageType('success');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration attempt failed:', error);
      setMessage('An error occurred during registration.');
      setMessageType('error');
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      {message && (
        <p className={`login-message ${messageType}`}>
          {message}
        </p>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="register-label" htmlFor="reg-username">Username:</label>
          <input
            className="register-input"
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="reg-email">Email:</label>
          <input
            className="register-input"
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="reg-password">Password:</label>
          <input
            className="register-input"
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="register-label" htmlFor="confirm-password">Confirm Password:</label>
          <input
            className="register-input"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
      <div className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default RegisterPage;

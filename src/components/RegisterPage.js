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
      // --- Updated: Join errors with <br /> for better display ---
      setMessage("Password requirements not met:<br /><br />" + errors.join('<br />'));
      setMessageType('error');
      // --- End of update ---
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      // --- Start: Check for existing user/email ---
      const existingUsersResponse = await fetch('http://localhost:5000/users');
      if (!existingUsersResponse.ok) {
        console.error('API Error fetching users:', existingUsersResponse.status, existingUsersResponse.statusText);
        setMessage('An error occurred while checking for existing users.');
        setMessageType('error');
        return;
      }
      const existingUsers = await existingUsersResponse.json();

      const usernameExists = existingUsers.some(user => user.username === username);
      const emailExists = existingUsers.some(user => user.email === email);

      if (usernameExists && emailExists) {
        setMessage('Registration failed: Username and email are already registered.');
        setMessageType('error');
        return; // Stop registration
      } else if (usernameExists) {
        setMessage('Registration failed: Username is already registered.');
        setMessageType('error');
        return; // Stop registration
      } else if (emailExists) {
        setMessage('Registration failed: Email is already registered.');
        setMessageType('error');
        return; // Stop registration
      }
      // --- End: Check for existing user/email ---


      // If user and email do not exist, proceed with registration
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
        // --- Updated: Use dangerouslySetInnerHTML to render HTML (br tags) ---
        <p className={`login-message ${messageType}`} dangerouslySetInnerHTML={{ __html: message }}>
        </p>
        // --- End of update ---
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

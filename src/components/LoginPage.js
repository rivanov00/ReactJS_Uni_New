import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-username-email">Username or Email:</label>
          <input
            type="text"
            id="login-username-email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;
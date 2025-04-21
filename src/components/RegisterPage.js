import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    // Basic client-side validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Log form data (placeholder for API call)
    console.log('Registration form submitted:', {
      username,
      email,
      password, // Be cautious logging passwords in real apps
    });

    // TODO: In Phase 3, implement the API call to register the user

    // Clear form fields after submission attempt
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reg-username">Username:</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
         <div>
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password" // Masks the input
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
         <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password" // Masks the input
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Link to navigate back to the login page */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default RegisterPage;
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/404.css';

function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        Go to Home Page
      </Link>
    </div>
  );
}

export default PageNotFound;
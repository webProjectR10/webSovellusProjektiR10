import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/groupsscreen">Groups</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;  // Default export


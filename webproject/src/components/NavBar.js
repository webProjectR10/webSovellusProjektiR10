import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../NavBar.css';
import { useUser } from '../context/UseUser';

const NavBar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="navdiv">
        <ul>
          <li><NavLink to="/" activeClassName="active-link">Movies</NavLink></li>
          <li><NavLink to="/groupsscreen" activeClassName="active-link">Groups</NavLink></li>
          <li><NavLink to="/schedule" activeClassName="active-link">Schedules</NavLink></li>
        </ul>
        {user && user.token ? (
          <Link to="/profile">
            <button id="profile-button">Profile</button>
          </Link>
        ) : (
          <Link to="/login">
            <button id="login-button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css'; 



const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navdiv">

        <ul>
        <button><Link to="/">Movies</Link></button>
        <button><Link to="/about">groups</Link></button>
        <button><Link to="/contact">schedules</Link></button>
        </ul>
        <ul>
        <button><Link to="/signup">login</Link></button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
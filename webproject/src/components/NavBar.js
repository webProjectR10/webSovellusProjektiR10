import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css'; 



const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navdiv">
        
        <ul>
          <button><Link to="/">Movies</Link></button>
          <button><Link to="/groupsscreen">groups</Link></button>
          <button><Link to="/schedule">schedules</Link></button>
        </ul> 
          <button id="login-button"><Link to="/signup">login</Link></button>
      </div>
    </nav>
  );
};

export default NavBar;
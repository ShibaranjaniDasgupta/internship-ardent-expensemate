import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className='brand-logo'>ExpenseMate</div>
      <ul>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/register">Logout</Link></li>
        <li><Link to="/adminpanel">Admin Panel</Link></li>
        <li>
          <button className="hamburger-btn" onClick={toggleSidebar}>
            ☰
          </button>
        </li>
      </ul>
     
    </nav>
  );
};

export default Navbar;


/*import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/add-expense">Add Expense</Link></li>
        <li><Link to="/expense-list">Expense List</Link></li>
        <li><Link to="/group-management">Groups</Link></li>
        <li><Link to="/create-group">Create Group</Link></li>
        <li><Link to="/settlements">Settlements</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </div>
  );
};
export default Sidebar;*/


import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="/" onClick={toggleSidebar}>Home</Link> </li>
        {/* <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
        {/* <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li> */}
        {/* <li><Link to="/add-expense" onClick={toggleSidebar}>Add Expense</Link></li> */}
        {/* <li><Link to="/expense-list" onClick={toggleSidebar}>Expense List</Link></li>
        <li><Link to="/create-group" onClick={toggleSidebar}>Create Group</Link></li> */}
        {/* <li><Link to="/main-content" onClick={toggleSidebar}>Group Management</Link></li>
        <li><Link to="/group-management" onClick={toggleSidebar}>Your Groups</Link></li>
        <li><Link to="/notifications" onClick={toggleSidebar}>Notifications</Link></li> */} 
        {/* <li><Link to="/setting" onClick={toggleSidebar}>Settings</Link></li> */}
        <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
        <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
         {/* <li><Link to="/help" onClick={toggleSidebar}>Help</Link></li>  */}
      </ul>
    </div>
  );
};

export default Sidebar;



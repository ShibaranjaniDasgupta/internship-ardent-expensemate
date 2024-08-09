import React from 'react';
import '../resources/settings.css';

function Settings()  {
  return (
    <div className="settings-page">
      <nav className="top-nav">
        <a href="/">Home</a>
        <a href="/add-expense">Add Expense</a>
        <a href="/expense-list">Expense List</a>
        <a href="/group-management">Groups</a>
        {/* <a href="#settlements">Settlements</a> */}
        <a href="/notifications">Notifications</a>
        {/* <a href="#profile-settings">Profile Settings</a> */}
        {/* <a href="#help">Help</a> */}
        <a href="/about">About</a>
      </nav>
      
      <main className="main-content1">
        <div className="settings-container">
          <button className="settings-button">Account Settings</button>
          <button className="settings-button">Preferences</button>
        </div>
      </main>
      
      <div className="page-label">Settings page</div>
    </div>
  );
};

export default Settings;
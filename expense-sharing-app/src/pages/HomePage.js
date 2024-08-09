import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content-inner">
        <div className="hero-section">
          <h2 className="animated-heading">Welcome</h2>
          <p>Track and share your expenses easily with friends and family.</p>
        </div>
        <div className="features-section">
          <h3>Features</h3>
          <div className="features">
            <div className="feature">
              <h4>Easy Expense Tracking</h4>
              <p>Keep track of all your expenses in one place.</p>
            </div>
            <div className="feature">
              <h4>Group Management</h4>
              <p>Create and manage groups for shared expenses.</p>
            </div>
            <div className="feature">
              <h4>Settlements</h4>
              <p>Easily settle up with friends and family.</p>
            </div>
          </div>
        </div>
        <div className="testimonials-section">
          <h3>What Our Users Say</h3>
          <div className="testimonials">
            <div className="testimonial">
              <p>"This app has made managing group expenses so easy!"</p>
              <p>- User A</p>
            </div>
            <div className="testimonial">
              <p>"I love how simple it is to track and settle expenses."</p>
              <p>- User B</p>
            </div>
          </div>
        </div>
        <div className="cta-section">
          <h3>Ready to get started?</h3>
          <a href="/register" className="cta-button">Sign Up Now</a>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 ExpenseMate. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </footer>
    </div>
  );
};

export default HomePage;

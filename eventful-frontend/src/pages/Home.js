import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>YOUR NEXT GREAT EXPERIENCE AWAITS</h1>
        <p>Discover concerts, theater performances, sports events, and more—all in one place.</p>
        <button className="hero-button">Find Your Next Event</button>
      </div>
      <div className="feature-section">
        <div className="feature">
          <h2>Personalized Reminders</h2>
          <p>Receive notifications about upcoming events and set custom reminders tailored to your preferences.</p>
        </div>
        <div className="feature">
          <h2>Seamless Ticketing</h2>
          <p>Purchase tickets effortlessly and get QR codes for quick event access and hassle-free check-ins.</p>
        </div>
        <div className="feature">
          <h2>Easy Event Sharing</h2>
          <p>Share your favorite events with friends and family on social media in just a few clicks.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

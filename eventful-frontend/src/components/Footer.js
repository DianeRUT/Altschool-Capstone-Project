// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-column">
          <h4>Use Eventful</h4>
          <a href="/create">Create Events</a>
          <a href="/pricing">Pricing</a>
          <a href="/marketing">Event Marketing Platform</a>
        </div>
        <div className="footer-column">
          <h4>Plan Events</h4>
          <a href="/sell-tickets">Sell Tickets Online</a>
          <a href="/planning">Event Planning</a>
        </div>
        <div className="footer-column">
          <h4>Find Events</h4>
          <a href="/new-york">New York Events</a>
          <a href="/los-angeles">Los Angeles Events</a>
        </div>
        <div className="footer-column">
          <h4>Connect With Us</h4>
          <a href="/contact">Contact Support</a>
          <a href="/sales">Contact Sales</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Eventful</p>
        <p><a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></p>
      </div>
    </footer>
  );
};

export default Footer;

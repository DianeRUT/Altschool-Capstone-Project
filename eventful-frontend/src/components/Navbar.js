import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement the search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Eventful</a>
      </div>
      <div className="navbar-links">
        <a href="/events">Find Events</a>
        <a href="/create">Create Events</a>
        <a href="/help">Help Center</a>
        <a href="/login">Log In</a>
        <a href="/signup" className="signup-button">Sign Up</a>
      </div>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;

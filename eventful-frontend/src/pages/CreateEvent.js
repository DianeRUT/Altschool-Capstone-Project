// src/pages/CreateEvent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        alert('You need to be logged in to create an event.');
        navigate('/login');
        return;
    }
    
      const response = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Reset form after successful submission
      setEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
      });
      alert('Event created successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={event.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Live Concert">Live Concert</option>
            <option value="Theater Performance">Theater Performance</option>
            <option value="Sports Event">Sports Event</option>
            <option value="Night Out">Night Out</option>
            <option value="Food and Drinks">Food and Drinks</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;

import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <Link to={`/events/events${event.id}`}>Get Tickets</Link>
        </div>
    );
}

export default EventCard;

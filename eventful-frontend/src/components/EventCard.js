import React , { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './EventCard.css';

const EventCard = ({ event, onDelete }) => {
    const { authToken } = useContext(AuthContext);
        
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${event._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok && onDelete) {
                onDelete(event._id); // Notify parent component to refresh the event list
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <Link to={`/events/events${event.id}`}>Get Tickets</Link>
            {event.createdBy === authToken && ( 
            <button onClick={handleDelete}>Delete</button>
            )}
        </div>
    );
}

export default EventCard;

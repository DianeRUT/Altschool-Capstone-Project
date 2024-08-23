import React, { useState, useEffect, useContext } from 'react';
import EventCard from './EventCard'; 
import { AuthContext } from '../context/AuthContext';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const { authToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [authToken]);

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    
                    'Authorization': `Bearer ${authToken}`, // Include the token here
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete event');
            }
            // Update the events list after deletion
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };


    return (
        <div className="event-list">
            {events.map(event => (
                <EventCard key={event._id} event={event} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default EventList;
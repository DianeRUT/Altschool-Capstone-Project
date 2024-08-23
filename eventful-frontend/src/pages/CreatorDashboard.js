import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import using curly braces
import EventCard from '../components/EventCard';

const CreatorDashboard = () => {
    const { authToken } = useContext(AuthContext); // Use the correct variable name from AuthContext
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events/my-events', { // Ensure the correct endpoint
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching user events:', error);
            }
        };

        fetchUserEvents();
    }, [authToken]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                setEvents(prevEvents => prevEvents.filter(event => event._id !== id)); // Remove event from list
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <h2>My Events</h2>
            <div className="event-list">
                {events.map(event => (
                    <EventCard key={event._id} event={event} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default CreatorDashboard;

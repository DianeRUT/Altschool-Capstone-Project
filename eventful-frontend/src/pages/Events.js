import React from 'react';
import EventList from '../components/EventList'; 
import './Events.css';

const Events = () => {
    return (
        <div>
            <h2>All Events</h2>
            <div className="event-list">
                <EventList />
            </div>
        </div>
    );
}

export default Events;

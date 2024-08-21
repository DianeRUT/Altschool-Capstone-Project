import React from 'react';
import EventCard from '../components/EventCard';
import './Events.css';

const Events = () => {
    const events = [
        {
            id: 1,
            title: 'Rwanda Jazz Festival',
            date: 'August 25, 2024',
            location: 'Kigali Convention Centre',
            category: 'Live Concert',
            description: 'Join us for an unforgettable night of smooth jazz featuring renowned artists from across the globe.'
        },
        {
            id: 2,
            title: 'Phantom of the Opera',
            date: 'September 2, 2024',
            location: 'Kigali Cultural Theatre',
            category: 'Theater Performance',
            description: 'Experience the classic musical that has captivated audiences for decades, live on stage.'
        },
        {
            id: 3,
            title: 'Kigali Marathon 2024',
            date: 'September 15, 2024',
            location: 'Amahoro National Stadium',
            category: 'Sports Event',
            description: 'Join thousands of runners from around the world in this year’s Kigali Marathon. Lace-up and run for a cause!'
        },
        {
            id: 4,
            title: 'Kigali Rooftop Party',
            date: 'August 30, 2024',
            location: 'Kigali Heights Rooftop',
            category: 'Night Out',
            description: 'Dance the night away under the stars with the best DJs in town at Kigali’s most exclusive rooftop party.'
        },
        {
            id: 5,
            title: 'Taste of Rwanda: Food and Wine Festival',
            date: 'October 10, 2024',
            location: 'Rwanda Arts Museum',
            category: 'Food and Drinks',
            description: 'Indulge in the best of Rwandan cuisine paired with wines from around the world at this culinary celebration.'
        }
    ];

    return (
        <div>
            <h2>All Events</h2>
            <div className="event-list">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default Events;

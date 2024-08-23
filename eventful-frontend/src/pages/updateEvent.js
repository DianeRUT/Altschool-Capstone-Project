import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            navigate('/events');
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={event.title} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={event.description} onChange={handleChange} />
            </label>
            <label>
                Date:
                <input type="datetime-local" name="date" value={event.date} onChange={handleChange} />
            </label>
            <label>
                Location:
                <input type="text" name="location" value={event.location} onChange={handleChange} />
            </label>
            <button type="submit">Update Event</button>
        </form>
    );
};

export default UpdateEvent;

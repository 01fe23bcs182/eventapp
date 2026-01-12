import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    const handleBookEvent = async (eventId) => {
        try {
            await api.post('/bookings', { eventId });
            alert('Event booked successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to book event');
        }
    };

    if (loading) {
        return <div className="loading">Loading events...</div>;
    }

    return (
        <div className="event-list">
            <h1>Available Events</h1>
            <div className="events-grid">
                {events.map((event) => (
                    <div key={event._id} className="event-card">
                        <div className="event-header">
                            <h3>{event.title}</h3>
                            <span className="price">${event.price}</span>
                        </div>
                        <p className="description">{event.description}</p>
                        <div className="event-details">
                            <div className="detail-item">
                                <span className="icon">📅</span>
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="icon">⏰</span>
                                <span>{event.time}</span>
                            </div>
                            <div className="detail-item">
                                <span className="icon">📍</span>
                                <span>{event.location}</span>
                            </div>
                        </div>
                        <button 
                            className="book-btn"
                            onClick={() => handleBookEvent(event._id)}
                        >
                            Book Event
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;

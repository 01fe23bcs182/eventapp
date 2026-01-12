import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: ''
    });
    const [editingEvent, setEditingEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await api.put(`/events/${editingEvent._id}`, formData);
            } else {
                await api.post('/events', formData);
            }
            
            setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                price: ''
            });
            setEditingEvent(null);
            setShowForm(false);
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleEdit = (event) => {
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            time: event.time,
            location: event.location,
            price: event.price
        });
        setEditingEvent(event);
        setShowForm(true);
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.delete(`/events/${eventId}`);
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button 
                    className="create-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Create Event'}
                </button>
            </div>

            {showForm && (
                <div className="event-form">
                    <h3>{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Event Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">
                            {editingEvent ? 'Update Event' : 'Create Event'}
                        </button>
                    </form>
                </div>
            )}

            <div className="events-grid">
                {events.map((event) => (
                    <div key={event._id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="event-details">
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Price:</strong> ${event.price}</p>
                        </div>
                        <div className="event-actions">
                            <button onClick={() => handleEdit(event)}>Edit</button>
                            <button onClick={() => handleDelete(event._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;

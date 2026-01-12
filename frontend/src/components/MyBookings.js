import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBookings.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/bookings/my-bookings');
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to cancel booking');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading your bookings...</div>;
    }

    return (
        <div className="my-bookings">
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <p>You haven't booked any events yet.</p>
                    <a href="/events" className="browse-btn">Browse Events</a>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <div className="booking-header">
                                <h3>{booking.event?.title || 'Event Title Not Available'}</h3>
                                <span className="booking-date">
                                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="description">{booking.event?.description || 'Event description not available'}</p>
                            <div className="event-details">
                                <div className="detail-item">
                                    <span className="icon">📅</span>
                                    <span>{booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'Date not available'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">⏰</span>
                                    <span>{booking.event?.time || 'Time not available'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">📍</span>
                                    <span>{booking.event?.location || 'Location not available'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">💰</span>
                                    <span>{booking.event?.price ? `$${booking.event.price}` : 'Price not available'}</span>
                                </div>
                            </div>
                            <button 
                                className="cancel-btn"
                                onClick={() => handleCancelBooking(booking._id)}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;

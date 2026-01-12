import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminBookings.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings/all');
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
                await api.delete(`/bookings/${bookingId}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to cancel booking');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading bookings...</div>;
    }

    return (
        <div className="admin-bookings">
            <h1>All Bookings</h1>
            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <p>No bookings found.</p>
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
                            <div className="user-info">
                                <p><strong>User:</strong> {booking.user?.username || 'Username not available'}</p>
                                <p><strong>Email:</strong> {booking.user?.email || 'Email not available'}</p>
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

export default AdminBookings;

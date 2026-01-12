import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <h2>EventHub</h2>
                </div>
                
                {isAuthenticated && (
                    <div className="nav-menu">
                        {user?.role === 'user' && (
                            <div className="nav-links">
                                <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>
                                    Events
                                </Link>
                                <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>
                                    My Bookings
                                </Link>
                            </div>
                        )}
                        {user?.role === 'admin' && (
                            <div className="nav-links">
                                <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                                    Events
                                </Link>
                                <Link to="/admin-bookings" className={location.pathname === '/admin-bookings' ? 'active' : ''}>
                                    All Bookings
                                </Link>
                            </div>
                        )}
                        <span className="welcome-text">Welcome, {user?.username}!</span>
                        <span className="role-badge">{user?.role}</span>
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

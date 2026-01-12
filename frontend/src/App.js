import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AdminBookings from './components/AdminBookings';
import EventList from './components/EventList';
import MyBookings from './components/MyBookings';
import './App.css';

const AppRoutes = () => {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <div className="app-content">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated ? (
                                <Navigate to={user?.role === 'admin' ? '/admin' : '/events'} replace />
                            ) : (
                                <Login />
                            )
                        } 
                    />
                    <Route 
                        path="/admin" 
                        element={
                            isAuthenticated ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />
                    <Route 
                        path="/admin-bookings" 
                        element={
                            isAuthenticated ? (
                                <AdminBookings />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />
                    <Route 
                        path="/events" 
                        element={
                            isAuthenticated ? (
                                <EventList />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />
                    <Route 
                        path="/my-bookings" 
                        element={
                            isAuthenticated ? (
                                <MyBookings />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <AppRoutes />
            </div>
        </AuthProvider>
    );
}

export default App;

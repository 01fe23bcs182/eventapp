import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token'),
        loading: true
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch({ type: 'SET_LOADING', payload: false });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token }
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (username, email, password, role = 'user') => {
        try {
            const response = await api.post('/auth/register', {
                username,
                email,
                password,
                role
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token }
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

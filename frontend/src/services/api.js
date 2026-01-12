import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export { API_BASE_URL, api };
export default api;

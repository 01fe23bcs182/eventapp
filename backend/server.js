const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = (process.env.CLIENT_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/bookings', require('./routes/bookings'));

// Serve frontend build in production
const frontendBuildPath = path.resolve(__dirname, '../frontend/build');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(frontendBuildPath));

    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) {
            return next();
        }

        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

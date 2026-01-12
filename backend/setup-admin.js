const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');

const setupDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/event_app');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            username: 'admin',
            email: 'admin@eventhub.com',
            password: adminPassword,
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created');

        // Create sample user
        const userPassword = await bcrypt.hash('user123', 10);
        const user = new User({
            username: 'testuser',
            email: 'user@eventhub.com',
            password: userPassword,
            role: 'user'
        });
        await user.save();
        console.log('Test user created');

        // Create sample events
        const events = [
            {
                title: 'Tech Conference 2024',
                description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.',
                date: new Date('2024-02-15'),
                time: '09:00 AM',
                location: 'Convention Center, Downtown',
                price: 299
            },
            {
                title: 'Music Festival',
                description: 'Three-day music festival with top artists from around the world. Food, art, and culture.',
                date: new Date('2024-03-20'),
                time: '12:00 PM',
                location: 'Central Park',
                price: 150
            },
            {
                title: 'Startup Pitch Night',
                description: 'Watch innovative startups pitch their ideas to investors. Network with entrepreneurs.',
                date: new Date('2024-01-25'),
                time: '06:00 PM',
                location: 'Tech Hub',
                price: 50
            }
        ];

        await Event.insertMany(events);
        console.log('Sample events created');

        console.log('\n=== DATABASE SETUP COMPLETE ===');
        console.log('ADMIN CREDENTIALS:');
        console.log('Email: admin@eventhub.com');
        console.log('Password: admin123');
        console.log('\nUSER CREDENTIALS:');
        console.log('Email: user@eventhub.com');
        console.log('Password: user123');
        console.log('\nDatabase and tables created successfully!');
        
        process.exit(0);
    } catch (error) {
        console.error('Setup error:', error);
        process.exit(1);
    }
};

setupDatabase();

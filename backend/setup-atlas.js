const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');

const setupAtlasDatabase = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect('mongodb+srv://01fe23bcs182_db_user:EventApp123@cluster0.nv2eubn.mongodb.net/eventapp?retryWrites=true&w=majority');
        console.log('Connected to MongoDB Atlas');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user with Atlas credentials
        const adminPassword = await bcrypt.hash('EventApp123', 10);
        const admin = new User({
            username: '01fe23bcs182_db_user',
            email: '01fe23bcs182_db_user@example.com',
            password: adminPassword,
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created with Atlas credentials');

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

        console.log('\n=== MONGODB ATLAS SETUP COMPLETE ===');
        console.log('ADMIN CREDENTIALS (Atlas User):');
        console.log('Email: 01fe23bcs182_db_user@example.com');
        console.log('Password: EventApp123');
        console.log('\nUsers can register with any email/password');
        console.log('Database and tables created successfully in Atlas!');
        
        process.exit(0);
    } catch (error) {
        console.error('Atlas setup error:', error);
        process.exit(1);
    }
};

setupAtlasDatabase();

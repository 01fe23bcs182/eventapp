const express = require('express');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all events (accessible by all authenticated users)
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create event (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
    try {
        const { title, description, date, time, location, price } = req.body;

        const event = new Event({
            title,
            description,
            date,
            time,
            location,
            price
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update event (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const { title, description, date, time, location, price } = req.body;

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, location, price },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete event (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// routes/playerRoutes.js

const express = require('express');
const Player = require('../models/playerModel');
const router = express.Router();

// POST: Create a new player
router.post('/', async (req, res) => {
    const { name, team, position, points } = req.body;

    try {
        const newPlayer = new Player({ name, team, position, points });
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Retrieve all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH: Update a player by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, team, position, points } = req.body;

    try {
        const updatedPlayer = await Player.findByIdAndUpdate(
            id,
            { name, team, position, points },
            { new: true }
        );
        if (!updatedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete a player by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPlayer = await Player.findByIdAndDelete(id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

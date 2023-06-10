// routes/houses.js
const express = require('express');
const router = express.Router();
const House = require('../models/House');

// Create a new house record
router.post('/', async (req, res) => {
    try {
        const { address, currentValue, loanAmount } = req.body;

        // Calculate the risk percentage for the loan
        const risk = (loanAmount / currentValue) * 100;

        // Create the new house record
        const house = await House.create({
            address,
            currentValue,
            loanAmount,
            risk,
        });

        res.status(201).json(house);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch a house record by ID
router.get('/:id', async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (house) {
            res.json(house);
        } else {
            res.status(404).json({ error: 'House not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a house record by ID
router.put('/:id', async (req, res) => {
    try {
        const { address, currentValue, loanAmount } = req.body;

        // Calculate the risk percentage for the loan
        const risk = (loanAmount / currentValue) * 100;

        const [updatedRowsCount, [updatedHouse]] = await House.update(
            {
                address,
                currentValue,
                loanAmount,
                risk,
            },
            {
                where: { id: req.params.id },
                returning: true,
            }
        );

        if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'House not found' });
        } else {
            res.json(updatedHouse);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

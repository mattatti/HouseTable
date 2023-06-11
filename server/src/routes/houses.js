// routes/houses.js
const express = require('express');
const router = express.Router();
const House = require('../models/House');
 
// Create a new house record
router.post('/', async (req, res) => {
    try {
        const {address, currentValue, loanAmount} = req.body;
        const risk = calculateRisk(currentValue, loanAmount);

        // Create the new house record
        const house = await House.create({
            address,
            currentValue,
            loanAmount,
            risk,
        });

        res.status(201).json(house);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// Fetch a house record by ID
router.get('/:id', async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (house) {
            res.json(house);
        } else {
            res.status(404).json({error: 'House not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// Update a house record by ID
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {address, currentValue, loanAmount} = req.body;
        const house = await House.findByPk(id);

        if (!house) {
            return res.status(404).json({error: 'House not found'});
        }

        const risk = calculateRisk(currentValue, loanAmount);

        house.address = address;
        house.currentValue = currentValue;
        house.loanAmount = loanAmount;
        house.risk = risk;

        await house.save();

        res.json(house);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

const calculateRisk = (currentValue, loanAmount) => {
    let risk = loanAmount / currentValue;

    if (loanAmount > 0.5 * currentValue) {
        risk += 0.1;
    }

    return Math.min(risk, 1);
};

module.exports = router;

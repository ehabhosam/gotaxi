const Ratio = require('../models/ratio');
const asyncHandler = require('express-async-handler');

const _id = '62ef546c1591489b9bb889cf'; 

// get request
const getRatio = asyncHandler( async (req, res) => {
    try {
        const fetchedObj = await Ratio.findOne({ _id }); 
        res.json(fetchedObj.benefit); 
        console.log('fetched benefit: ', fetchedObj.benefit)
    } catch (error) {
        res.sendStatus(401); 
        throw new Error(error);
    }
});

// put request
const setRatio = asyncHandler( async (req, res) => {
    console.log('trying to set benefit with: ', req.body) // should be like ex: { benefit: 1.4 }
    try {
        const result = await Ratio.findOneAndUpdate({ _id }, req.body, {new: true} ); 
        res.json({
            updated: true,
            new_benefit: result.benefit
        }); 
    } catch (err) {
        console.log('err:', err)
        res.status(401).send({error: 'an error occurred updating benefit'}); 
        throw new Error(err);
    }
});

module.exports = { getRatio, setRatio }; 
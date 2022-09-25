const express = require('express'); 
const router = express().Router(); 

const {
    getAllRides, 
    getRidesFilteredByStatus, 
    getClientRides, 
    getClientFilteredRides
} = require('../controllers/rideController')


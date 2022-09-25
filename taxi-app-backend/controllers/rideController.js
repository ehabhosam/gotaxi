const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin'); 
const Client = require('../models/client'); 
const Ride = require('../models/ride');

// GET Requests:

// get all rides. 
// access: admins only
const getAllRides = asyncHandler(async (req, res) => {
    try {
        const rides = Ride.find(); 
        res.json(rides); 
    } catch (error) {
        res.status(401)
        throw new Error('An error occurred fetching data.', error)
    }
});

// get filtered by status rides.
// access: admins only 
// ** send the filtering mehtod in params with key ride- ** 
const getRidesFilteredByStatus = asyncHandler(async (req, res) => {
    try {
        const rideStatus = req.params.status
        const rides = Ride.find({ status: rideStatus });
        res.json(rides);  
    } catch (error) {
        res.status(401); 
        throw new Error('An error occurred fetching data.', error); 
    }
}); 

// get client route (based on client id)
// access: clients || admins
const getClientRides = asyncHandler(async (req, res) => {
    try {
        const id = req.headers.id; 
        const clientRides = await Ride.find({ client_id: id });
        res.json(clientRides); 
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
}); 

const getClientFilteredRides = asyncHandler(async (req, res)=> {
    try {
        const id = req.headers.id; 
        const rideStatus = req.params.status
        const clientFilteredRides = await Ride.find({ client_id: id, status: rideStatus });
        res.json(clientFilteredRides); 
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
});





module.exports = { 
    getAllRides, 
    getRidesFilteredByStatus, 
    getClientRides, 
    getClientFilteredRides
 }
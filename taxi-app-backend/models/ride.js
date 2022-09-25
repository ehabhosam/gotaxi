const mongoose = require('mongoose');


// messages schema
const messagesSchema = new mongoose.Schema([{ text: String }], { timestamps: true }); 

// defining schema
const ridesSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.ObjectId, 
        required: true
    }, 
    driver_id: {
        type: mongoose.ObjectId, 
        required: false
    }, 
    from_Location: {
        type: [mongoose.Decimal128], 
        required: true
    }, 
    to_Locaiton: {
        type: [mongoose.Decimal128], 
        required: true
    },
    driver_last_location: {
        type: [mongoose.Decimal128], 
        required: false
    }, 
    messages: { 
        type: messagesSchema, 
    }, 
    status: {
        type: String, 
        required: true,
        default: 'submitted' // accepted, going, done, cancelled, stopped
    },
    price: {
        type: Number, 
        required: true,
        // generated from: from_Location, to_Location, Benefit
    },
}, { versionKey: false , timestamps: true }); 

module.exports = mongoose.model('rides', ridesSchema)
const mongoose = require('mongoose'); 

const clientSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    phone: {
        type: Number, 
        required: true
    },
}, {versionKey: false})

module.exports = mongoose.model('clients', clientSchema); 
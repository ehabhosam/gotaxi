const mongoose = require('mongoose'); 

const adminSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true  
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        default: 'help-admin' // other value: 'system-admin'
    }
}, {versionKey: false})

module.exports = mongoose.model('admins', adminSchema); 
const mongoose = require('mongoose'); 

const ratioSchema = new mongoose.Schema({
    benefit: {
        type: Number, 
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('ratios', ratioSchema); 
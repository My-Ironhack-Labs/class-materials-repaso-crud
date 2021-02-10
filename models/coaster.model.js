const mongoose = require('mongoose')
const coasterSchema = new mongoose.Schema({
    name: String,
    description: String,
    inversions: Number,
    length: Number,
    active: Boolean,
    park:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Park'
        }]
})

// Aquí el esquema

const Coaster = mongoose.model('Coaster', coasterSchema)
module.exports = Coaster
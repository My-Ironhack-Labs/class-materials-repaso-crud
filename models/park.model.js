const mongoose = require('mongoose')
const parkSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean,
})

// Aquí el esquema

const Park = mongoose.model('Park', parkSchema)

module.exports = Park
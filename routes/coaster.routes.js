const { signedCookie } = require('cookie-parser')
const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

// Aquí los endpoints
router.get('/new', (req, res) => {
    Park
        .find()
        // .then(console.log(Park.find()))
        .select('name')
        // .then(names => console.log(names))
        .then(names => res.render('coasters/new-coaster', { names }))
        .catch(err => console.log(err))
})
router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body
    
    // console.log({ name, description, inversions, length, park })
    Coaster
        .create({ name, description, inversions, length, park })
        // .then(coaster => console.log('Se ha creado:', coaster))
        .then(coaster => res.redirect('/coasters/new'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Coaster
        .find()
        // .then(coasters => console.log(coasters))
        .then(coasters => res.render('coasters/coasters-index', { coasters }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => res.render('coasters/coaster-details'))

module.exports = router
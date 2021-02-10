const express = require('express')
const Park = require('../models/park.model')
const router = express.Router()

// Aquí los endpoints
router.get('/new', (req, res) => res.render('parks/new-park'))
router.post('/new', (req, res) => {
    // console.log(req.body)
    const { name, description } = req.body
    console.log(req.body)
    Park
        .create({ name, description })
        .then(park => res.redirect('/parks/new'))
        .catch(err => console.log(err))
})

module.exports = router
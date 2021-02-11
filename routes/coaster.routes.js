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

router.get('/delete', (req, res) => {
    // console.log('Esto es el req.query:', req.query)
    const coaster_id = req.query.id
    Coaster
        .findByIdAndRemove(coaster_id)
        .then(deleteCoaster => res.redirect('/coasters'))
})

router.get('/edit', (req, res) => {
    ///////////////////////////////////////////////////// Teo, cómo hago para ver el objeto del parque y el de la montañan rusa en la misma vista?????????????
    const coaster_id = req.query.id
    Park
        .find()
        .select('name')
        .then(names => res.render('coasters/coaster-edit', { names }))
        .catch(err => console.log(err))
    // console.log('Esto es el req.query:', req.query)
        .then(() => Coaster.findById(coaster_id))
        .then(coaster => res.render('coasters/coaster-edit', coaster))
            // console.log(coaster)
        .catch(err => console.log(err))
        
        
})
// router.post('/edit', (req, res) => {
//     console.log('queryyyyy', req.query)
//     const coaster_id = req.query.id
//     const {name, description, inversions, length, park} = req.query
//     Coaster
//         .findByIdAndUpdate({name, description, inversions, length, park})
//         .then(coaster => {
//             // console.log(coaster)
//         res.redirect('/coasters')
//         })
// })

router.get('/:id', (req, res) => {
    // console.log(req.params)
    const montaña_id = req.params.id
    Coaster
        .findById(montaña_id)
        .then(coaster => {
            // console.log(coaster)
            res.render('coasters/coaster-details', coaster)
        })
        .catch(err => console.log(err))
})



module.exports = router
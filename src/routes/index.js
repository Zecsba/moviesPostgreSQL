const express = require('express');
const routerGenre = require('./genreRouter');
const routerActor = require('./actorRouter');
const routerDirector = require('./directorRouter');
const routerMovie = require('./movieRouter');

const router = express.Router();

router.use('/genres', routerGenre)
router.use('/actors', routerActor)
router.use('/directors', routerDirector)
router.use('/movies', routerMovie)


module.exports = router;
const catchError = require('../utils/catchError');

const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Actor, Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//? /movies/:id/genres

const setGenres = catchError(async(req, res) => {

    //! 1 - Identificar el id
    const { id } = req.params;

    const movies = await Movie.findByPk(id)
    if(!movies) return res.json('No existe la pelicula')

    //! 2 - Seteo los generos a peliculas
    await movies.setGenres(req.body)
    
    //! 3 - Obtener lo que se setea, con el objetivo de dar vista
    const genre = await movies.getGenres()

    //! 4 - Final retorno
    return res.json(genre)

})

//? /movies/:id/actors

const setActors = catchError(async (req, res) => {
    const { id } = req.params;

    const movies = await Movie.findByPk(id)
    if(!movies) return res.json('No existe la pelicula')

    await movies.setActors(req.body)
    
    const actor = await movies.getActors()
    return res.json(actor)
})

//? /movies/:id/directors

const setDirectors = catchError(async (req, res) => {

    const { id } = req.params;

    const movies = await Movie.findByPk(id)
    if(!movies) return res.json('No existe la pelicula')

    await movies.setDirectors(req.body)

    const directors = await movies.getDirectors()
    return res.json(directors)

})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors
}
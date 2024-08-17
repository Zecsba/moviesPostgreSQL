require('../models')
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const request = require('supertest')
const app = require('../app')

let moviesId;

const BASE_URL = '/api/v1/movies'
const movies = {
    name: "Deadpool",
    image: "Despues",
    synopsis: "Pelicula chistosa",
    releaseYear: "2024/07/28"
}


test("POST -> BASE_URL, should return statusCode 201, res.body.name === movies.name", async() => {

    const res = await request(app)
        .post(BASE_URL)
        .send(movies)

    moviesId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movies.name)

})

test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    //? Revisando las tablas de las relaciones
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)

    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)
})

test("GET -> BASE_URL/moviesId, should return statusCode 200, res.body.name === movies.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${moviesId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movies.name)

    //? Revisando las tablas de las relaciones
    expect(res.body.actors).toBeDefined()
    expect(res.body.actors).toHaveLength(0)

    expect(res.body.genres).toBeDefined()
    expect(res.body.genres).toHaveLength(0)

    expect(res.body.directors).toBeDefined()
    expect(res.body.directors).toHaveLength(0)
})

test("PUT -> BASE_URL/moviesId, should return statusCode 200, res.body.name === moviesUpdated.name", async() => {
    
    const moviesUpdated = { 
        name: "Dylann"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${moviesId}`)
        .send(moviesUpdated)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(moviesUpdated.name)
})

test("POST -> BASE_URL/:id/actors, should return statusCode 200, res.body.length === 1", async() => {

    const actor = {
        firstName: 'Sebastian',
        lastName: 'Casallas',
        nationality: 'Colombiano',
        image: 'Despues',
        birthday: '2004/05/18'
    }

    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${BASE_URL}/${moviesId}/actors`)
        .send([createActor.id])

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    
        expect(res.body[0]).toBeDefined()
        expect(res.body[0].id).toBe(createActor.id)
    
        await createActor.destroy()

})

test("POST -> BASE_URL/:id/directors, should return statusCode 200, res.body.length === 1", async() => {

    const directors = {
        firstName: "Sebastian",
        lastName: "Casallas",
        nationality: "Colombiano",
        image: "Despues",
        birthday: "2004/04/18"
    }

    const createDirector = await Director.create(directors)

    const res = await request(app)
        .post(`${BASE_URL}/${moviesId}/directors`)
        .send([createDirector.id])

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    
        expect(res.body[0]).toBeDefined()
        expect(res.body[0].id).toBe(createDirector.id)
    
        await createDirector.destroy()

})

test("POST -> BASE_URL/:id/genres, should return statusCode 200, res.body.length === 1", async() => {

    const genre = {
        name: 'Horror'
    }

    const createGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${BASE_URL}/${moviesId}/genres`)
        .send([createGenre.id])

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
    
        expect(res.body[0]).toBeDefined()
        expect(res.body[0].id).toBe(createGenre.id)
    
        await createGenre.destroy()

})

test("DELETE -> BASE_URL/moviesId, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${moviesId}`)

    expect(res.statusCode).toBe(204)
})
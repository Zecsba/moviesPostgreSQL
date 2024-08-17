const request = require('supertest')
const app = require('../app')

let actorId;

const BASE_URL = '/api/v1/actors'
const actor = {
    firstName: 'Sebastian',
    lastName: 'Casallas',
    nationality: 'Colombiano',
    image: 'Despues',
    birthday: '2004/05/18'
}

//! Importante el orden a la hora de hacer testeo

test("POST -> BASE_URL, should return statusCode 201, res.body.firstName === actor.firstName", async() => {

    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    //TODO: We are assingin the id to the variable let
    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async() => {

    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> BASE_URL/actorId, should return statusCode 200, res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT -> BASE_URL/actorId, should return statusCode 200, res.body.firstName === actorUpdated.firstName", async () => { 
    const actorUpdated = {
        firstName: 'Dylann'
    }
    
    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdated)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdated.firstName)
})

test("DELETE -> BASE_URL/actorId, shoul return statusCode 204", async() => {
    
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)

})
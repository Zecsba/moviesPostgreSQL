const request = require('supertest')
const app = require('../app')

let directorId;

const BASE_URL = '/api/v1/directors'
const directors = {
    firstName: "Sebastian",
    lastName: "Casallas",
    nationality: "Colombiano",
    image: "Despues",
    birthday: "2004/04/18"
}


test("POST -> BASE_URL, should return statusCode 201, res.body.firstName === directors.firstName", async() => {

    const res = await request(app)
        .post(BASE_URL)
        .send(directors)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directors.firstName)

})

test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async() => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> BASE_URL/directorId, should return statusCode 200, res.body.firstName === directors.firstName", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directors.firstName)
})

test("PUT -> BASE_URL/directorId, should return statusCode 200, res.body.firstName === directorsUpdated.firstName", async() => {
    
    const directorsUpdated = { 
        firstName: "Dylann"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorsUpdated)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorsUpdated.firstName)
})


test("DELETE -> BASE_URL/directorId, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.statusCode).toBe(204)
})
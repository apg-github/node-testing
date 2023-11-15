const request = require('supertest');
const {faker} = require("@faker-js/faker");

describe('APG Application', () => {

    it('GET /entries should respond with list of entries', async () => {
        const response = await request('http://localhost:3000/api')
            .get('/entries')

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeInstanceOf(Array)
    });

    it('GET /entry/:id should respond with entry details', async () => {
        const entry = {key: faker.random.word(), value: faker.random.numeric(2), time: new Date().toLocaleString()};
        const createResponse = await request('http://localhost:3000/api')
            .post('/entry')
            .send(entry)

        const response = await request('http://localhost:3000/api')
            .get('/entry/' + createResponse.body.id)

        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data.key).toBe(entry.key)
        expect(response.body.data.value.toString()).toBe(entry.value)
        expect(response.body.data.time).toBe(entry.time)
    });

    it('GET /entry/:id should respond with error (no such id)', async () => {
        const response = await request('http://localhost:3000/api')
            .get('/entry/' + 'noSuchId')

        expect(response.statusCode).toBe(400)
        expect(response.body.error.message).toBe('Cast to ObjectId failed for value "noSuchId" at path "_id" for model "data"')
        expect(response.body.error.name).toBe("CastError")
    });

    it('POST /entries/:id should add entry with success', async () => {
        const entry = {key: faker.random.word(), value: faker.random.numeric(2), time: new Date().toLocaleString()};
        const createResponse = await request('http://localhost:3000/api')
            .post('/entry')
            .send(entry)

        expect(createResponse.statusCode).toBe(201)
        expect(createResponse.body.success).toBe(true)
        expect(createResponse.body.id).not.toBe(undefined)
        expect(createResponse.body.message).toBe('Entry added')

    });

    it('POST /entries/:id with broken body should return error (no time)', async () => {
        const entry = {key: faker.random.word(), value: faker.random.numeric(2)};
        const createResponse = await request('http://localhost:3000/api')
            .post('/entry')
            .send(entry)

        expect(createResponse.statusCode).toBe(400)
        expect(createResponse.body.error.name).toBe('ValidationError')
        expect(createResponse.body.error.message).toBe('data validation failed: time: Path `time` is required.')
        expect(createResponse.body.message).toBe('Entry not added')
    });

    it('POST /entries/:id with broken body should return error (no key)', async () => {
        const entry = {value: faker.random.numeric(2), time: new Date().toLocaleString()};
        const createResponse = await request('http://localhost:3000/api')
            .post('/entry')
            .send(entry)

        expect(createResponse.statusCode).toBe(400)
        expect(createResponse.body.error.name).toBe('ValidationError')
        expect(createResponse.body.error.message).toBe('data validation failed: key: Path `key` is required.')
        expect(createResponse.body.message).toBe('Entry not added')
    });

    it('DELETE /entry/:id should delete entry with success', async () => {
        const entry = {key: faker.random.word(), value: faker.random.numeric(2), time: new Date().toLocaleString()};
        const createResponse = await request('http://localhost:3000/api')
            .post('/entry')
            .send(entry)

        expect(createResponse.statusCode).toBe(201)

        const deleteResponse = await request('http://localhost:3000/api')
            .delete('/entry/' + createResponse.body.id)

        expect(deleteResponse.statusCode).toBe(200)
    });

    it('DELETE /entry/:id should respond with error (no such id)', async () => {
        const deleteResponse = await request('http://localhost:3000/api')
            .delete('/entry/' + "noSuchId")

        expect(deleteResponse.statusCode).toBe(400)
        expect(deleteResponse.body.error.name).toBe('CastError')
        expect(deleteResponse.body.error.message).toBe('Cast to ObjectId failed for value "noSuchId" at path "_id" for model "data"')
    });

});
const request = require('supertest');
const app = require('../app');

describe('app', () => {

describe('GET app.js', () => {
    test('GET /api/topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            response = response.body;
            expect(response[0]).toEqual(
                expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
            })
            )
        })
        .catch(err => {
            console.log(err);
        });
    });

    // test('GET /api/articles', () => {
    //     return request(app)
    //     .get('/api/articles')
    //     .expect(200)
    //     .then((response) => {
    //         // console.log(response, "<-- response");
    //         expect(response).toHaveProperty("rows");
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });;
    // });
})
});
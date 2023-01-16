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

    test('GET /api/articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            response = response.body;
            console.log(response[0]);
            expect(response[0]).toEqual(
                expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
            )
        })
        .catch(err => {
            console.log(err);
        });;
    });
})
});
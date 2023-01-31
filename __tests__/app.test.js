const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index');
const { response } = require('../app');

beforeEach(() => {
    return seed(testData);
})

describe('app', () => {

    describe('GET app.js', () => {
        test('GET /api/topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then((response) => {
                    response = response.body;

                    expect(response.length).toBeGreaterThan(0);
                    response.forEach(element => {
                        expect(element).toEqual(
                            expect.objectContaining({
                                slug: expect.any(String),
                                description: expect.any(String),
                            })
                        );
                    });

                })
        });

        test('GET /api/articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((response) => {
                    response = response.body;

                    expect(response.length).toBeGreaterThan(0);
                    response.forEach(element => {
                        expect(element).toEqual(
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
                        );
                    });

                })

        });

        test('should respond with the requested article, GET /api/article/:id', () => {
            let articleId = 1;

            return request(app)
                .get(`/api/article/${articleId}`)
                .expect(200)
                .then(({body}) => {
                    expect(body[0]).toEqual(
                        expect.objectContaining({
                            article_id: articleId,
                            title: expect.any(String),
                            topic: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url: expect.any(String)
                        })
                    );
                });
        });

        test('should respond with error message when article does not exist, GET /api/article/:id', () => {
            let articleId = 9999;
            
            return request(app)
            .get(`/api/article/${articleId}`)
            .expect(404)
            .then(({body}) => {
                expect(body).toEqual({});
            })
        });

        test('should return an array of comments for a given articleID, GET /api/articles/:article_id/comments', () => {
            let articleId = 1;

            return request(app)
                .get(`/api/articles/${articleId}/comments`)
                .expect(200)
                .then((response) => {
                    response = response.body;
                    expect(response.length).toBeGreaterThan(0);
                    response.forEach(comment => {
                        expect(comment).toEqual(
                            expect.objectContaining({
                                comment_id: expect.any(Number),
                                votes: expect.any(Number),
                                created_at: expect.any(String),
                                author: expect.any(String),
                                body: expect.any(String),
                                article_id: expect.any(Number)
                            })
                        );
                    })
                });
        });

        test('should respond with an error message when article does not exist, GET /api/articles/:article_id/comments', () => {
            let articleId = 9999;
            return request(app)
            .get(`/api/articles/${articleId}/comments`)
            .expect(404)
            .then(({body}) => {
                expect(body).toEqual({});
            })
        });
    });

    describe('GET for users', () => {
        test('should receive an array of users', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .then((response) => {
                    expect(response.body.rows.length).toBeGreaterThan(0);

                    response.body.rows.forEach(user => {
                        expect(user).toHaveProperty('username', expect.any(String));
                        expect(user).toHaveProperty('name', expect.any(String));
                        expect(user).toHaveProperty('avatar_url', expect.any(String));
                    });
                });
        });


        test('should create a new comment with a username and body tag', () => {
            let article_id = 3;
            return request(app)
                .post(`/api/articles/${article_id}/comments`)
                .expect(201)
                .send({
                    username: 'icellusedkars',
                    body: 'This is a great article!'
                })
                .then(res => {
                    expect(res.statusCode).toEqual(201);
                    expect(res.body).toHaveProperty('author', 'icellusedkars');
                    expect(res.body).toHaveProperty('body', 'This is a great article!');
                    expect(res.body).toHaveProperty('created_at', expect.any(String));
                    expect(res.body).toHaveProperty('votes', expect.any(Number));
                    expect(res.body).toHaveProperty('article_id', expect.any(Number));
                    expect(res.body).toHaveProperty('comment_id', expect.any(Number));
                });

        });
        test('should update amount of votes in an article accordingly', () => {
            let increaseVotesBy = 10;
            let articleId = 4;

            return request(app)
                .get(`/api/article/${articleId}`)
                .expect(200)
                .then((response) => {
                    let votes = response.body[0].votes;
                    return request(app)
                        .patch(`/api/articles/${articleId}`)
                        .send({ inc_votes: increaseVotesBy })
                        .expect(201)
                        .then((res) => {
                            expect(res.body.rows[0]).toEqual(
                                expect.objectContaining({
                                    title: expect.any(String),
                                    topic: expect.any(String),
                                    author: expect.any(String),
                                    body: expect.any(String),
                                    created_at: expect.any(String),
                                    votes: votes + increaseVotesBy,
                                    article_img_url: expect.any(String)
                                })
                            )
                        })
                    // console.log(response);
                });
        });
    })
});
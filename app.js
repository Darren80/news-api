const express = require('express');
const { getTopics, getArticles, getArticleById, getCommentsByArticleId } = require('./controllers/controllers.js');
const listen = require('./listen');

const app = express();
app.use(express.json());


app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/article/:id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

listen(app);

module.exports = app;
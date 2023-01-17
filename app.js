const express = require('express');
const { getTopics, getArticles, getArticleById } = require('./models/models.js');
const listen = require('./listen');

const app = express();
app.use(express.json());


app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/article/:id', getArticleById);

listen(app);

module.exports = app;
const express = require('express');
const { getTopics, getArticles } = require('./models/models.js');
const listen = require('./listen');

const app = express();
app.use(express.json());


app.get('/api/topics', getTopics);
app.use('/api/articles', getArticles);

listen(app);

module.exports = app;
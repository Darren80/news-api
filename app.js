const express = require('express');
const { getTopics, getArticles } = require('./models/models.js');

const app = express();
app.use(express.json());


app.get('/api/topics', getTopics);
app.use('/api/articles', getArticles);

app.listen(3000, () => {});

module.exports = app;
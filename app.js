const express = require('express');
const { getTopics, getArticles, getArticleById, getCommentsByArticleId, postComment, patchArticleVote, getUsers } = require('./controllers/controllers.js');
const listen = require('./listen');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/article/:id', getArticleById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postComment);
app.patch('/api/articles/:article_id', patchArticleVote);

app.get('/api/users', getUsers)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
  next();
});

const { PORT = 9090 } = process.env;
listen(app, PORT);

module.exports = { app, PORT };
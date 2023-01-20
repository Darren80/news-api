const { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId } = require('../models/models.js')

const getTopics = (req, res) => { 
    fetchTopics().then(data => {
        res.status(200).send(data); 
    })
}

const getArticles = (req, res) => { 
    fetchArticles().then(data => {
        res.status(200).send(data);
    })
}

const getArticleById = (req, res) => {
    const id = Number(req.params.id);
    fetchArticleById(id).then(data => {
        res.status(200).send(data);
    })
}

const getCommentsByArticleId = (req, res) => {
    const article_id = Number(req.params.article_id);
    fetchCommentsByArticleId(article_id).then(data => {
        res.status(200).send(data);
    })
}

module.exports = {
    getTopics, getArticles, getArticleById, getCommentsByArticleId
}
const { fetchTopics, fetchArticles, fetchArticleById } = require('../controllers/controllers.js')

const getTopics = (req, res) => { 
    fetchTopics().then(data => {
        res.status(200).send(data); 
    });
}

const getArticles = (req, res) => { 
    fetchArticles().then(data => {
        return res.status(200).send(data);
    });
}

const getArticleById = (req, res) => {
    const id = Number(req.params.id);
    fetchArticleById(id).then(data => {
        return res.status(200).send(data);
    });
}

module.exports = {
    getTopics, getArticles, getArticleById
}
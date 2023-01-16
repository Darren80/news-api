const { fetchTopics, fetchArticles } = require('../controllers/controllers.js')

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

module.exports = {
    getTopics, getArticles
}
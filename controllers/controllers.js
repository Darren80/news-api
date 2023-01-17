const format = require('pg-format');
const db = require('../db/connection');

const fetchTopics = () => { 
    return db.query('SELECT * FROM topics;')
    .then(topics => {
        return topics.rows;
    })
}

const fetchArticles = () => { 
    return db.query('SELECT * FROM articles;')
    .then(topics => {
        return topics.rows;
    })
}

const fetchArticleById = (id) => { 
    id = [id];
    return db.query('SELECT * FROM articles WHERE article_id = $1;', id)
    .then(topics => {
        return topics.rows;
    })
}

module.exports = {
    fetchTopics, fetchArticles, fetchArticleById
}
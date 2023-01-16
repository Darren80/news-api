const format = require('pg-format');
const db = require('../db/connection');

const fetchTopics = (res, req) => { 
    return db.query('SELECT * FROM topics;')
    .then(topics => {
        return topics.rows;
    })
}

const fetchArticles = (res, req) => { 
    return db.query('SELECT * FROM articles;')
    .then(topics => {
        return topics.rows;
    })
}

module.exports = {
    fetchTopics, fetchArticles
}
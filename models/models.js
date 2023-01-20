const format = require('pg-format');
const db = require('../db/connection');

const fetchTopics = () => { 
    return db.query('SELECT * FROM topics;')
    .then(topics => {
        return topics.rows;
    })
    .catch(err => {
        console.log(err);
    });
}

const fetchComments = () => {
    return db.query('SELECT * FROM comments;')
    .then(comments => {
        return comments.rows;
    })
    .catch(err => {
        console.log(err);
    });
}

const fetchCommentsByArticleId = (article_id) => {
    return db.query('SELECT * FROM comments WHERE article_id = $1;', [article_id])
    .then(comments => {
        return comments.rows;
    })
    .catch(err => {
        console.log(err);
    });
}

const fetchArticles = () => { 
    let prom1 = db.query('SELECT * FROM articles;')
    .then(topics => {
        return topics.rows;
    });

    return Promise.all([prom1, fetchComments()])
    .then(([articles, comments]) => {
        for (let article of articles) {
            let comment_count = comments.reduce((sum, comment) => {
                if (comment.article_id === article.article_id) {
                    console.log("Ding");
                    return sum + 1;
                } else {
                    return sum;
                }
            }, 0);
            article.comment_count = comment_count;
        }
        return articles;
    })
}

const fetchArticleById = (id) => { 
    id = [id];
    return db.query('SELECT * FROM articles WHERE article_id = $1;', id)
    .then(topics => {
        return topics.rows;
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId
}
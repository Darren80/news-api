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
        comments.rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
    })
    .catch(err => {
        console.log(err);
    });;

    return Promise.all([prom1, fetchComments()])
    .then(([articles, comments]) => {
        for (let article of articles) {
            let comment_count = comments.reduce((sum, comment) => {
                if (comment.article_id === article.article_id) {
                    return sum + 1;
                } else {
                    return sum;
                }
            }, 0);
            article.comment_count = comment_count;
        }
        return articles;
    })
    .catch(err => {
        console.log(err);
    })
}

const fetchArticleById = (id) => { 
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
    .then(topics => {
        return topics.rows;
    })
    .catch(err => {
        console.log(err);
    });
}

const writeComment = (article_id, comment) => {
    console.log(comment, '<-- comment');
    let query = format(`INSERT INTO
    comments (body, author, article_id)
    VALUES ($1, $2, $3) RETURNING *;`);
    return db.query(query, [comment.body, comment.username, article_id])
    .then(comment => {
        return comment.rows[0];
    });
}

const updateArticleVote = (article_id, inc_votes) => {
    // console.log(article_id, inc_votes, typeof article_id, typeof inc_votes);
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
    .catch(err => {
        console.log(err);
    });
}

const fetchUsers = () => {
    return db.query('SELECT * FROM users;')
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId, writeComment, updateArticleVote, fetchUsers
}
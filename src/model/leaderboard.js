
//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var LeaderBoard = {

    findByUserId: function (id, callback) {
        console.log(id)
        const query = {
            name: 'findByUserId',
            text: 'SELECT * FROM uno_leaderboard WHERE userid = $1',
            values: [id],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows)
                return callback(null, result.rows);
            }
        },
        );
    },

    getNumOfScores: function (num, callback) {
        const query = {
            name: 'getNumOfScores',
            text: 'SELECT score, uno_leaderboard.created_at, username, uno_leaderboard.userid, profileicon FROM uno_leaderboard LEFT JOIN players ON uno_leaderboard.userid = players.userid ORDER BY uno_leaderboard.score DESC LIMIT $1;',
            values: [num],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows)
                return callback(null, result.rows);
            }
        },
        );
    },

    updateHighestScore: function (score, id, callback) {
        const query = {
            name: 'fetch-user',
            text: 'UPDATE uno_leaderboard SET score = $1, created_by = NOW() WHERE userid = $2;',
            values: [score, id],
        }

        return pool.query(query, function (error, result) {
            console.log(query)
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows)
                return callback(null, result.rows);
            }
        },
        );
    },
    insertNewScore: function (id, score, callback) {
        console.log(id)
        console.log(score)
        const query = {
            name: 'insertNewScore',
            text: 'INSERT INTO uno_leaderboard("userid", "score") VALUES($1, $2);',
            values: [id, score],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows)
                return callback(null, result.rows);
            }
        },
        );
    },

}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = LeaderBoard;

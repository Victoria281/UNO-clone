
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
            text: `SELECT scores.score, scores.created_at, p.username, p.userid, p.profileicon 
                    FROM players as p
                    INNER JOIN (
                        SELECT SUM(l.score) as score, MAX(l.created_at) as created_at, l.userid
                        FROM uno_leaderboard as l
                        GROUP BY (l.userid)
                    ) AS scores ON scores.userid = p.userid
                    ORDER BY 1 DESC
                    LIMIT $1;`,
            values: [num],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows);
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
    
    insertNewScore: function (score, id, game_status, callback) {
        const query = {
            name: 'insertNewScore',
            text: 'INSERT INTO uno_leaderboard("userid", "score", "game_status", "created_at") VALUES($1, $2, $3, NOW());',
            values: [id, score, game_status],
        }
        console.log(query)

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

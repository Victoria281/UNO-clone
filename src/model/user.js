
//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var User = {

    findByUserID: function (id, callback) {
        const query = {
            name: 'findByUserID',
            text: 'SELECT p.username, p.email, p.profileicon, l.score, l.created_at FROM players AS p LEFT JOIN uno_leaderboard AS l ON p.userid = l.userid WHERE p.userid =$1',
            values: [id],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                if (result.rows.length == 0){
                    callback("404", null);
                } else {
                    console.log(result.rows)
                return callback(null, result.rows[0]);
                }
                
            }
        },
        );
    },
    
    getUserStat: function (id, callback) {
        console.log("====================================");
        console.log("getUserStats running!");
        console.log("userId:", id);
        console.log("====================================");
        
        const query = {
            name: 'getUserStat',
            text: `SELECT 
                        p.username, ul.score, ul.game_status, ul.created_at 
                    FROM 
                        uno_leaderboard as ul, players as p
                    WHERE 
                        ul.userid = $1
                        AND ul.userid = p.userid`,
            values: [id],
        };
        
        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows);
                return callback(null, result.rows);
            }
        });
    },

    getUserOverallStat: function (id, callback) {
        console.log("====================================");
        console.log("getUserOverallStat running!\n\n");
        console.log("userId:", id);
        console.log("====================================");
        
        const query = {
            name: 'getUserOverallStat',
            text: `SELECT 
                        COUNT(p.username) 'Total', 
                        MAX(ul.score) 'Max Score', 
                        ul.game_status 'Total No. of Wins', 
                        MAX(ul.created_at) 'Last Played'
                    FROM 
                        uno_leaderboard as ul, players as p
                    WHERE 
                        ul.userid = $1
                        AND ul.userid = p.userid
                `,
            values: [id],
        };
        
        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                console.log(result.rows);
                return callback(null, result.rows);
            }
        });
    },

    checkPassword: function (id, callback) {
        try {
            const query = {
                name: 'checkPassword',
                text: 'SELECT password FROM players WHERE userid=$1;',
                values: [id],
            }

            return pool.query(query, function (error, result) {
                console.log(result)
                if (error) {
                    callback(error, null);
                    return;
                } else {
                    return callback(null, [result.rows[0]]);
                }
            });
        } catch (error) {
            return callback(error, null);;
        }

    },

    updateUserPassword: function (userid, password, callback) {
        const query = {
            name: 'updateUserPassword',
            text: 'UPDATE players SET password=$1 WHERE userid=$2',
            values: [password, userid],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                return callback(null, result.rowCount);
            }
        });
    },
    
    updateUserInfo: function (userid, username, email, callback) {
        const query = {
            name: 'updateUserInfo',
            text: 'UPDATE players SET username=$1,email=$2 WHERE userid=$3',
            values: [username,email,userid],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                return callback(null, result.rowCount);
            }
        });
    },

    updateUserIcon: function (userid, icon, callback) {
        const query = {
            name: 'updateUserPassword',
            text: 'UPDATE players SET profileicon=$1 WHERE userid=$2',
            values: [icon, userid],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                return callback(null, result.rowCount);
            }
        });
    },

    deleteUser: function (id, callback) {
        const query = {
            name: 'deleteUser',
            text: 'DELETE FROM players WHERE userid = $1',
            values: [id],
        }

        return pool.query(query, function (error, result) {
            console.log(error)
            console.log(result)
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

    resetUserPasswordMailtrap: function (userid, password, callback) {
        const query = {
            name: 'resetUserPassword',
            text: 'UPDATE players SET password=$1 WHERE userid=$2',
            values: [password, userid],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                return callback(null, result.rowCount);
            }
        });
    },
    
    resetUserPasswordGmail: function (email, password, callback) {
        const query = {
            name: 'resetUserPassword',
            text: 'UPDATE players SET password=$1 WHERE email=$2',
            values: [password, email],
        }

        return pool.query(query, function (error, result) {
            if (error) {
                callback(error, null);
                return;
            } else {
                return callback(null, result.rowCount);
            }
        });
    },
}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = User;

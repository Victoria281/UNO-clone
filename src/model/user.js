
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
            text: 'SELECT p.username, p.email, p.profileicon, l.score, l.created_by FROM players AS p LEFT JOIN uno_leaderboard AS l ON p.userid = l.userid WHERE p.userid =$1',
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
            text: 'UPDATE players SET usenrame=$1,email="$2" WHERE userid=$3',
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

}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = User;

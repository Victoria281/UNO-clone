
//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var Auth = {

    login: function (email, callback) {
        try {
            const query = {
                name: 'login',
                text: 'SELECT userid, username FROM players WHERE email=$1;',
                values: [email],
            }

            return pool.query(query, function (error, result) {
                if (error) {
                    callback(error, null);
                    return;
                } else {
                    console.log(result.rows)
                    return callback(null, [result.rows[0]]);
                }
            });
        } catch (error) {
            return callback(error, null);;
        }

    },

    register: function (username, email, password, callback) {
        const query = {
            name: 'register',
            text: 'INSERT INTO players("username", "email", "password") VALUES($1, $2, $3);',
            values: [username, email, password],
        }
        const query2 = {
            name: 'getUserid',
            text: 'SELECT userid FROM players WHERE username=$1;',
            values: [username],
        }

        return pool.query(query, function (error, result) {
            console.log(error)
            if (error) {
                callback(error, null);
                return;
            } else {
                return pool.query(query2, function (error, result) {
                    console.log(error)
                    if (error) {
                        callback(error, null);
                        return;
                    } else {
                        return callback(null, result.rows);
                    }
                });
            }
        });
    },

}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = Auth;


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
                text: 'SELECT * FROM players WHERE email=$1;',
                values: [email],
            }

            return pool.query(query, function (error, result) {
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

    register: function (username, email, password, callback) {
        const query = {
            name: 'register',
            text: 'INSERT INTO players("username", "email", "password") VALUES($1, $2, $3);',
            values: [username, email, password],
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
module.exports = Auth;

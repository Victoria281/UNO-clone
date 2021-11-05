
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
            name: 'fetch-user',
            text: 'SELECT * FROM uno_cards WHERE card_id = $1',
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

    updateUser: function (id, callback) {
        const query = {
            name: 'fetch-user',
            text: 'SELECT * FROM uno_cards WHERE card_id = $1',
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

    deleteUser: function (id, callback) {
        const query = {
            name: 'fetch-user',
            text: 'SELECT * FROM uno_cards WHERE card_id = $1',
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

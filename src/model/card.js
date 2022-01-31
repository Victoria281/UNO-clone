
//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var Card = {

    findByID: function (id, callback) {
        const query = {
            name: 'findByID',
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

    findAll: function (callback) {
        const query = {
            name: 'findAll',
            text: 'SELECT * FROM uno_cards ORDER BY card_id;',
            values: [],
        }

        return pool.query(query, function (error, result) {
            // console.log(error)
            // console.log(result)
            if (error) {
                callback(error, null);
                return;
            } else {
                const cards = [];
                for (let i = 0; i < result.rows.length; i++) {
                    const card = result.rows[i];
                    cards.push({
                        id: card.card_id,
                        color: card.color,
                        values: card.values,
                        image_file: card.image_file,
                    });
                }
                return callback(null, cards);
            }
        },
        );
    },
}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = Card;


//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var Game = {

    findByState: function (state, callback) {
        const query = {
            name: 'findByState',
            text: 'SELECT q.state, a.actionName, q.qvalue FROM uno_qtable AS q, uno_actions AS a WHERE q.state = $1',
            values: [state],
        }

        return pool.query(query, function (error, result) {
            // console.log(error)
            // console.log(result)
            if (error) {
                callback(error, null);
                return;
            } else {
                // console.log(result.rows)
                const actions = [];
                for (let i = 0; i < result.rows.length; i++) {
                    const action = result.rows[i];
                    actions.push(action);
                }
                return callback(null, actions);
            }
        },
        );
    },
    findByStateAction: function (state, action, callback) {
        const query = {
            name: 'findQValue',
            text: 'SELECT q.state, a.actionName, q.qvalue FROM uno_qtable AS q, uno_actions AS a WHERE q.state = $1 AND q.action = $2',
            values: [state, action],
        }

        return pool.query(query, function (error, result) {
            // console.log(error)
            // console.log(result)
            if (error) {
                callback(error, null);
                return;
            } else {
                // console.log(result.rows)
                return callback(null, result.rows[0]);
            }
        },
        );
    },
    insertStateAction: function (state,action,callback) {
        const query = {
            name: 'insertStateAction',
            text: 'INSERT INTO uno_qtable("state", "action") VALUES ($1, $2);',
            values: [state,action],
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
    updateQvalue: function (qvalue, state,action,callback) {
        const query = {
            name: 'updateQvalue',
            text: 'UPDATE uno_qtable SET qValue = $1 WHERE state = $2 AND action = $3;',
            values: [qvalue,state,action],
        }
        console.log("query")
        console.log(qvalue)
        console.log(state)
        console.log(action)
        console.log(query)
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
    findActionValue: function (actionname, callback) {
        console.log("actionname")
        console.log(actionname)
        const query = {
            name: 'findByAction',
            text: 'SELECT action FROM uno_actions WHERE actionname = $1',
            values: [actionname],
        }

        return pool.query(query, function (error, result) {
            // console.log("Error" + error)
            // console.log("Result" +result)
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
module.exports = Game;

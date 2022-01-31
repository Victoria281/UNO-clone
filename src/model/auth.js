
//---------------------------------------------
//imports
//---------------------------------------------

const pool = require("../../db");

//---------------------------------------------
//object / functions
//---------------------------------------------
var Auth = {

    login: (email, callback) => {
        console.log("email:", email);
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
                    console.log(result);

                    if (result.rowCount === 0) {
                        return callback(null, []);
                    } else {
                        return callback(null, [result.rows[0]]);
                    }
                }
            });
        } catch (error) {
            return callback(error, null);;
        }

    },

    attachGoogleId: (data, callback) => {
        const username = data.name;
        const email = data.email;
        const googleUserId = data.gid;

        try {
            const query = {
                name: 'attachGoogleId',
                text: `
                    UPDATE
                        players
                    SET
                        username = $1,
                        googleId = $2
                    WHERE
                        email = $3;
                `,
                values: [username, email, googleUserId],
            }

            return pool.query(query, function (error, result) {
                if (error) {
                    callback(error, null);
                    return;
                } else {
                    console.log(result.rowCount)
                    return callback(null, result.rowCount);
                }
            });

        } catch (error) {
            return callback(error, null);;
        }

    },

    registerWithGoogle: (data, callback) => {
        const username = data.name;
        const email = data.email;
        const googleUserId = data.gid;
        const password = "GOOGLE_LOGIN";

        const query = {
            name: 'register',
            text: 'INSERT INTO players(username, email, password, googleid) VALUES($1, $2, $3, $4);',
            values: [username, email, password, googleUserId],
        }
        const query2 = {
            name: 'getUserid',
            text: 'SELECT userid FROM players WHERE email=$1;',
            values: [email],
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

    register: (username, email, password, callback) => {
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

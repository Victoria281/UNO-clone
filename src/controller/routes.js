const createHttpError = require('http-errors');

const app = require('express').Router();

const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');


//ROUTES//
const Card = require("../model/card")
const User = require("../model/user")
const LeaderBoard = require("../model/leaderboard")
const Auth = require("../model/auth")

//Middleware//
const verifyToken = require("../middlewares/verifyToken");
const printingDebuggingInfo = require("../middlewares/printingRequest");
// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

//retrieveImagesForUno
app.get('/images/*', function (req, res, next) {
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var filePath = path.join(__dirname,
        action).split("%20").join(" ");
    console.log(action)
    console.log(filePath)

    fs.exists(filePath, function (exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        var ext = path.extname(action);
        var contentType = "text/plain";

        if (ext === ".png") {
            contentType = "image/png";
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        fs.readFile(filePath,
            function (err, content) {
                res.end(content);
            });
    });
});

//retrieveImagesForProfile
app.get('/profile_icons/*', function (req, res, next) {
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var filePath = path.join(__dirname,
        action).split("%20").join(" ");

    fs.exists(filePath, function (exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        var ext = path.extname(action);
        var contentType = "text/plain";

        if (ext === ".png") {
            contentType = "image/png";
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        fs.readFile(filePath,
            function (err, content) {
                res.end(content);
            });
    });
});

//=====================================
//  Card
//=====================================

//findById
app.get('/card/:id', verifyToken, function (req, res, next) {
    console.log("herere")
    const id = req.params.id;

    Card.findByID(id, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.json({ card: result });
        }
    });
});

//findAll
app.get('/cards', function (req, res, next) {

    Card.findAll(function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.json({ cards: result });
        }
    });
});

//=====================================
//  Auth
//=====================================

//login
app.post('/login', printingDebuggingInfo, function (req, res, next) {

    let email = req.body.email;
    let password = req.body.password;
    try {
        Auth.login(email, function (error, results) {
            if (error) {
                return res.status(500).json({ message: 'Credentials are not valid.' });

            } else {
                if (results.length == 1) {
                    if ((password == null) || (results[0] == null)) {
                        return res.status(500).json({ message: 'login failed' });
                    }
                    if (bcrypt.compareSync(password, results[0].password) == true) {
                        
                        let data = {
                            user_id: results[0].userid,
                            token: jwt.sign({ id: results[0].userid }, config, {
                                expiresIn: 86400
                            })
                        };
                        return res.status(200).json(data);
                    } else {
                        return res.status(500).json({ message: error });
                    }
                }

            }

        })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

//register
app.post('/register', printingDebuggingInfo, function (req, res, next) {
    console.log('processRegister running.');
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;

    
    bcrypt.hash(password, 10, async(err, hash) => {
        if (err) {
            console.log('Error on hashing password');
            
            return res.status(500).json({ statusMessage: 'Unable to complete registration with error!' });
        } else {
                results = Auth.register(userName, email, hash, function(error, results){
                  console.log("RESULTS: " + results)
                if (results!=null){
                    console.log("Successful Registration!!!!!!!!!!!!!!!!!!!!!!")
                    return res.status(201).json({ statusMessage: 'Completed registration.' });
                }
                console.log("IM HEREEEEEEEEEEEEEEEE and the error here is " + error )
                if (error) {
                    console.log("ERROR CODE:---------------------------- " + error)
                    
                    return res.status(500).json({ statusMessage: 'Unable to complete registration due to duplicate field(s)' });
                }
                });
        }
    });

});

//=====================================
//  User
//=====================================

//findByUserId
app.get('/user/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;

    User.findByUserID(id, function (err, result) {
        if (err) {
            if (err === "404") {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.json({ user: result });
        }
    });
});

//updateUserPassword
app.put('/user/update/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;

    try {
        User.checkPassword(id, function (error, results) {
            if (error) {
                return res.status(404).json({ message: 'User does not exist' });
            } else {
                console.log(results)
                if (results.length == 1) {
                    if ((old_password == null) || (results[0] == null)) {
                        return res.status(500).json({ message: 'No password placed' });
                    }
                    if (bcrypt.compareSync(old_password, results[0].password) == true) {
                        bcrypt.hash(new_password, 10, async (err, hash) => {
                            if (err) {
                                return res.status(500).json({ statusMessage: 'Unable to complete update' });
                            } else {
                                results = User.updateUserPassword(id, hash, function (error, results) {
                                    console.log(results)
                                    if (results != null) {
                                        return res.status(204).json({ statusMessage: 'Completed update.' });
                                    }
                                    if (error) {
                                        return res.status(500).json({ statusMessage: 'Unable to complete update' });
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(500).json({ message: "Wrong password" });
                    }
                }

            }

        })
    } catch (error) {
        return next(err);
    }

});

//deleteUser
app.delete('/user/delete/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;

    User.deleteUser(id, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(204).json({ message: "deleted" });
        }
    });
});


//=====================================
//  LeaderBoard
//=====================================

//findByUserId
app.get('/leaderboard/user/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;

    LeaderBoard.findByUserId(id, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(200).send({ score: result });
        }
    });
});

//getAllScores
app.get('/leaderboard', printingDebuggingInfo, function (req, res, next) {

    LeaderBoard.getAllScores(function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(200).send({ score: result });
        }
    });
});

//getNumOfScores
app.get('/leaderboard/:num', printingDebuggingInfo, function (req, res, next) {
    const num = req.params.num;

    LeaderBoard.getNumOfScores(num, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(200).send({ scores: result });
        }
    });
});

//updateHighestScore
app.get('/leaderboard/update/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;
    const score = req.body.score;

    LeaderBoard.updateHighestScore(score, id, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(201).send({ result: "Created" });
        }
    });
});

//insertNewScore
app.post('/leaderboard/insert/:id', printingDebuggingInfo, function (req, res, next) {
    const id = req.params.id;
    const score = req.body.score;

    LeaderBoard.insertNewScore(id, score, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(201).send({ result: "Created" });
        }
    });
});


module.exports = app;
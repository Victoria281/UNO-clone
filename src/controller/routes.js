
const createHttpError = require('http-errors');

const app = require('express').Router();

const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');

// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const pool = require("../../db");
//ROUTES//
const Card = require("../model/card")
const LeaderBoard = require("../model/leaderboard")

//Middleware//
const printingDebuggingInfo = require("../middlewares/printingRequest");

//findById
app.get('/images/*', function (req, res, next) {
    console.log("here")
    // Parsing the URL 
    var request = url.parse(req.url, true);
  
    // Extracting the path of file
    var action = request.pathname;

    // Path Refinements
    var filePath = path.join(__dirname, 
            action).split("%20").join(" ");
  
    // Checking if the path exists
    fs.exists(filePath, function (exists) {
  
        if (!exists) {
            res.writeHead(404, { 
                "Content-Type": "text/plain" });
            res.end("404 Not Found");
            return;
        }
  
        // Extracting file extension
        var ext = path.extname(action);
  
        // Setting default Content-Type
        var contentType = "text/plain";
  
        // Checking if the extention of 
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/png";
        }
  
        // Setting the headers
        res.writeHead(200, { 
            "Content-Type": contentType });
  
        // Reading the file
        fs.readFile(filePath, 
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
});

// Check login
app.post('/login', function (req, res, next) {
    const uname = req.body.uname;
    const password = req.body.password;
   
    return pool.query(`SELECT * FROM uno_userdetails WHERE username=$1 AND password=$2`,
        [uname, password],
        function (error, result) {
            
            console.log(result.rows)

            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            try{
               if(result.rows[0].username == uname && result.rows[0].password == password){
                    console.log("IN THE SUCCESS!!")
                    return res.status(200).send("Authorized!");
                }
                    
                
            } catch(err){
                console.log("THERES AN ERROR!!")
                return res.status(401).send("UNAUTHORIZED");
            }
            
            
        },
    );
});

// Register
app.post('/register', printingDebuggingInfo, function (req, res, next) {
    const uname = req.body.uname;
    const password = req.body.password;
    const email = req.body.email;
   
    return pool.query(`INSERT INTO uno_userdetails(username, password, email) VALUES ($1, $2, $3)`,
        [uname, password, email],
        function (error, result) {
            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            try{
                console.log("SUCCESS!!")
                console.log("The result is " + result);
                return res.status(201).send("Successfully Inserted");

            } catch(err){
                console.log("THERES AN ERROR!!");
                console.log("The error is " + error);
                return res.status(401).send("UNAUTHORIZED");
            }
        },
    );
});



// GET USER INFO
app.get('/getUsers/:id', function (req, res, next) {
    const userid = req.params.id;

    return pool.query(`SELECT * FROM uno_userdetails WHERE user_id=$1`,
        [userid],
        function (error, result) {
            console.log("IM HEREEEE")
            console.log(result)

            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            if (error) {
                console.log("ERROR IS HERE!!")
                throw error
            }
            res.status(200).json(result.rows)
            
        },
    );
});

//=====================================
//  Card
//=====================================

//findById
app.get('/card/:id', function (req, res, next) {
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
            return res.status(201).send({result: "Created"});
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
            return res.status(201).send({result: "Created"});
        }
    });
});


module.exports = app;

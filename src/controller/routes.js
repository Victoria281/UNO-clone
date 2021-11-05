const createHttpError = require('http-errors');

const app = require('express').Router();

//ROUTES//
const Card = require("../model/card")
const User = require("../model/user")
const LeaderBoard = require("../model/leaderboard")
const Auth = require("../model/auth")

//Middleware//
const printingDebuggingInfo = require("../middlewares/printingRequest");

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
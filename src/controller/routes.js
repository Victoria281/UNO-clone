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
const printingDebuggingInfo = require("../middlewares/printingRequest");

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

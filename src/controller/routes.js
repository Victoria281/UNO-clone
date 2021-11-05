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


module.exports = app;
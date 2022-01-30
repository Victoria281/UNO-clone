const createHttpError = require('http-errors');

const app = require('express').Router();

const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const redis = require('ioredis');

// console.log("REDIS_URL:", process.env.REDIS_URL);
// console.log("REDIS_PORT:", process.env.REDIS_PORT);
// console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD);

const redisClient = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (errorStream) => {
    console.log("Error has occured in the redisClient:", errorStream);
})
// const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL);

//ROUTES//
const Card = require("../model/card")
const User = require("../model/user")
const LeaderBoard = require("../model/leaderboard")
const Auth = require("../model/auth")
const Game = require("../model/game")

//Middleware//
const verifyGoogleToken = require('../middlewares/verifyGoogleToken');
const verifyToken = require('../middlewares/verifyToken');
const printingDebuggingInfo = require("../middlewares/printingRequest");

// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const e = require('express');

//=====================================
//  Images
//=====================================

//retrieveImagesForUno
app.get('/images/*', printingDebuggingInfo, function (req, res, next) {
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var filePath = path.join(__dirname, action).split("%20").join(" ");
    console.log(action)
    console.log(filePath)

    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return next(createHttpError(404, `Not found`));
            }
            throw err;
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
app.get('/profile_icons/*', printingDebuggingInfo, function (req, res, next) {
    var request = url.parse(req.url, true);
    var action = request.pathname;
    var filePath = path.join(__dirname, action).split("%20").join(" ");
    console.log(action)
    console.log(filePath)

    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return next(createHttpError(404, `Not found`));
            }
            throw err;
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

//findAll
app.get('/cards', printingDebuggingInfo, function (req, res, next) {

    Card.findAll(function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ cards: result });
            }

        }
    });
});

//=====================================
//  Game
//=====================================

//findbystate
app.get('/game/:state', printingDebuggingInfo, function (req, res, next) {
    const state = req.params.state;

    Game.findByState(state, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ actions: result });
            }

        }
    });
});

//findbystateaction
app.get('/game/:state/:action', printingDebuggingInfo, function (req, res, next) {
    const state = req.params.state
    const action = req.params.action

    Game.findByStateAction(state,action, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ data: result });
            }

        }
    });
});

//insertstateaction
app.post('/game/', printingDebuggingInfo, function (req, res, next) {
    const state = req.body.state
    const action = req.body.action

    Game.insertStateAction(state, action, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ statusMessage : 'StateAction insert complete' });
            }

        }
    });
});

//updateqvalue
app.put('/game/update/', printingDebuggingInfo, function (req, res, next) {
    const qValue = req.body.qvalue
    const state = req.body.state
    const action = req.body.action

    Game.updateQvalue(qValue,state, action, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ statusMessage : 'StateAction update complete' });
            }

        }
    });
});

//findbyactionname
app.get('/game/:actionname', printingDebuggingInfo, function (req, res, next) {
    const action = req.params.actionname

    Game.findActionValue(action, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            if (result.length == 0) {
                return next(createHttpError(404, `Not found`));
            } else {
                return res.status(200).json({ action_value: result });
            }

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
                            }),
                            username: results[0].username
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

// OAuth v2.0 Login -- Google
app.post('/login/google', printingDebuggingInfo, verifyGoogleToken, function (req, res, next) {
    // const googleJWTtoken = req.headers.authorization.replace('Bearer ', '');
    // console.log("googleJWTtoken: " + googleJWTtoken);

    const googlePayload = req.googlePayload;
    const googleToken = req.googleToken;

    try {
        Auth.login(googlePayload.email, function (error, results) {
            if (error) {
                const message = {
                    code: 500,
                    message: 'Internal Server Error',
                    error: error
                }

                return res.status(500).json(message);

            } else {
                console.log("thelength:", results);
                // Indicates that the user is registered with our internal system
                if (results.length === 1) {
                    const userid = results.userid;
                    console.log("results: " + results);

                    const data = {
                        name: googlePayload.name,
                        email: googlePayload.email,
                        gid: googlePayload.sub,
                    };

                    Auth.attachGoogleId(data, (error2, results2) => {
                        if (error2) {
                            const message = {
                                code: 500,
                                message: 'Internal Server Error',
                                error: error2
                            }

                            return res.status(500).json(message);

                        } else {
                            const data = {
                                user_id: results[0].userid,
                                token: googleToken,
                                username: results[0].username
                            };

                            return res.status(200).json(data);
                        }
                    });
                }

                else if (results.length <= 0) {
                    const data = {
                        name: googlePayload.name,
                        email: googlePayload.email,
                        gid: googlePayload.sub,
                    };

                    Auth.registerWithGoogle(data, (error2, results2) => {
                        if (error2) {
                            const message = {
                                code: 500,
                                message: 'Internal Server Error',
                                error: error2
                            }

                            return res.status(500).json(message);

                        } else {
                            console.log("done registering!");
                            console.log("results2:", results2);

                            const data = {
                                user_id: results2[0].userid,
                                token: googleToken,
                                username: googlePayload.name
                            };

                            console.log(">>", data);

                            return res.status(200).json(data);
                        }
                    });
                }

                else {
                    console.log("ERROR!!!!, Results:", results);

                    const message = {
                        code: 500,
                        message: 'Internal Server Error Signing up With Google'
                    }

                    return res.status(500).json(message);
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


    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.log('Error on hashing password');

            return res.status(500).json({ statusMessage: 'Unable to complete registration with error!' });
        } else {
            results = Auth.register(userName, email, hash, function (error, results) {
                console.log("RESULTS: " + results)
                if (results != null) {
                    LeaderBoard.insertNewScore(results[0].userid, 0, function (err, result) {
                        console.log(results)
                        console.log(results[0].userid)
                        if (err) {
                            if (err.code === '23505') {
                                return next(createHttpError(404, `Not found`));
                            }
                            else {
                                return next(err);
                            }
                        } else {

                            // Deletes the allUsers key inside of Redis (if any)
                            // So that a new allUsers list can be generated
                            redisClient.del("allUsers");

                            return res.status(201).json({ statusMessage: 'Completed registration.' });
                        }
                    });


                }
                console.log("IM HEREEEEEEEEEEEEEEEE and the error here is " + error)
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
//getUserStatistics
app.get('/user/stat', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const uid = req.decodedToken.id;
    console.log(">>>>", uid);
    User.getUserStat(uid, function (err, result) {
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

//getUserOverallStatistics
app.get('/user/stat/overall', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const uid = req.decodedToken.id;
    console.log(">>>>", uid);

    User.getUserOverallStat(uid, function (err, result) {
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

//findByUserId
app.get('/user/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const id = req.params.id;

    User.findByUserID(id, function (err, result) {
        if (err) {
            if (err === "404") {
                console.log("result: 404");
                return next(createHttpError(404, `Not found`));
            }
            else {
                console.log("result: thank you next");
                return next(err);
            }
        } else {
            if (result.length === 0) {
                console.log("result:", "no result");
                return next(createHttpError(404, `Not found`));
            } else {
                console.log("result:", result);

                const message = {
                    user: result
                };

                console.log("returning!");
                return res.status(200).json(message);
            }
        }
    });
});

//updateUserIcon
app.put('/user/icon/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const id = req.params.id;
    const icon = req.body.icon;

    User.updateUserIcon(id, icon, function (err, result) {
        if (err) {
            if (err === "404") {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(204).json({ statusMessage: 'Completed update.' });
        }
    });

});

//updateUserInfo
app.put('/user/updateinfo/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const id = req.params.id;
    const newusername = req.body.username;
    const newemail = req.body.email;

    User.updateUserInfo(id, newusername, newemail, function (err, result) {
        if (err) {
            if (err === "404") {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {
            return res.status(204).json({ statusMessage: 'Completed update.' });
        }
    });

});

//updateUserPassword
app.put('/user/update/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
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
app.delete('/user/delete/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
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
            // Deletes the allUsers key that is currently in redis
            // So that a new one can be generated when a user queries for the data
            redisClient.del("allUsers");
            return res.status(204).json({ message: "deleted" });
        }
    });
});


//getAllUsers
app.get('/user', printingDebuggingInfo, async (req, res, next) => {

    // Enable this line for debugging and testing purposes as the TTL of this key in redis is 1 hour
    // redisClient.del("allUsers");

    const allUsers = await redisClient.get("allUsers");
    console.log(allUsers);

    if (allUsers) {
        console.log("Users Retrieved from Redis");

        const response = JSON.parse(allUsers);

        return res.status(200).json(response);
    }

    User.getAllUsers((err, response) => {
        if (err) {
            const message = {
                code: 500,
                message: "Internal server error, getting all users"
            };

            return res.status(500).json(message);

        } else {
            const message = {
                code: 200,
                rowCount: response.rowCout,
                users: response.rows
            };

            // console.log(JSON.stringify(message));

            redisClient.set("allUsers", JSON.stringify(response.rows), "EX", 60 * 60);

            return res.status(200).json(message);
        }
    });
});

//getFriend
app.get('/user/friend/:uid', printingDebuggingInfo, verifyToken, async (req, res, next) => {
    let { uid } = req.params;
    // console.log("uid", uid);
    // console.log("req.decodedToken.id", req.decodedToken.id);

    if (isNaN(uid)) {
        console.error("ERROR: uid is not a number");
        const message = {
            message: 'User id needs to be a number',
            code: 400
        };
        return res.status(400).json(message);

    } else {
        uid = parseInt(uid);
    }

    if (uid !== req.decodedToken.id) {
        console.error("ERROR: uid is not the same as the user id");

        const message = {
            message: 'You are not authorized to view this user\'s friends',
            code: 401
        };
        return res.status(401).json(message);
    }

    else {

        const pf = await redisClient.keys(`pending_${uid}_*`);
        console.log(">>>> pendingFriends", pf);

        const friends = await redisClient.get(`friends_${uid}`);
        // console.log('friends:', friends);
        if (friends) {
            console.log("friends from redis");

            const message = {
                code: 200,
                message: 'Successfully retrieved friends from redis',
                data: JSON.parse(friends)
            };

            return res.status(200).json(message);
        }

        User.getFriend(uid, (err, result) => {
            if (err) {
                const message = {
                    code: 500,
                    message: 'Unable to get friends',
                };

                return res.status(500).json(message);

            } else {

                // Set information into the redis cache, with 30min Expiry
                redisClient.set(`friends_${uid}`, JSON.stringify(result), "EX", 1800);

                const message = {
                    code: 200,
                    message: 'Successfully retrieved friends',
                    data: result
                };

                return res.status(200).json(message);
            }
        });

    }
});

/*
    For Pending Friend Requests:

    1. Create an endpoint that will return all pending friend requests for a user
    2. Store the pending friend requests from the database in redis

    When User A clicks "Add Friend" button:
        User A request is stored in redis with TTL of 48 hours (demo can be 1 min if need be)
        User B is alerted to the friend request via a push notification (Sub/Pub)
        
        Once TTL is up, the request is deleted, main database is not touched
        Once User B accepts the request, the main database is updated, the redis key is deleted (allUsers, friends_${uid}, pendingFriends_${uid})

*/

app.get('/user/friend/pending/:uid', printingDebuggingInfo, verifyToken, async (req, res, next) => {
    let { uid } = req.params;

    try {
        uid = parseInt(uid);
    } catch (err) {
        console.log("ERROR: uid must be a number", err);
        const message = {
            code: 400,
            message: 'uid must be a number'
        };
        return res.status(400).json(message);
    }

    if (uid !== req.decodedToken.id) {
        console.error("ERROR: uid is not the same as the user id");

        const message = {
            code: 401,
            message: 'You are not authorized to view this user\'s pending friend requests',
        };
        return res.status(401).json(message);
    }

    const pendingFriends = await redisClient.scan(0, 'MATCH', `pendingFriends_*_${uid}`);

    if (pendingFriends) {
        console.log("pending friends from redis");
        console.log(">>>>>LL", pendingFriends);

        const message = {
            code: 200,
            message: 'Successfully retrieved pending friends from redis',
            data: pendingFriends[1]
        };

        return res.status(200).json(message);
    }

    const message = {
        code: 200,
        message: 'You have no pending friend requests',
        data: []
    };

    return res.status(200).json(message);

});

app.get('/user/friend/pending/sent/:uid', printingDebuggingInfo, verifyToken, async (req, res, next) => {
    let { uid } = req.params;

    try {
        uid = parseInt(uid);
    } catch (err) {
        console.log("ERROR: uid must be a number", err);
        const message = {
            code: 400,
            message: 'uid must be a number'
        };
        return res.status(400).json(message);
    }

    if (uid !== req.decodedToken.id) {
        console.error("ERROR: uid is not the same as the user id");

        const message = {
            code: 401,
            message: 'You are not authorized to view this user\'s pending friend requests',
        };
        return res.status(401).json(message);
    }

    const pendingFriends = await redisClient.scan(0, 'MATCH', `pendingFriends_${uid}_*`);

    if (pendingFriends) {
        console.log("pending friends from redis");
        console.log(">>>>>", pendingFriends);

        const message = {
            code: 200,
            message: 'Successfully retrieved sent pending friends from redis',
            data: pendingFriends[1]
        };

        return res.status(200).json(message);
    }

    const message = {
        code: 200,
        message: 'You have no pending friend requests',
        data: []
    };

    return res.status(200).json(message);

});

// addFriend / SendFriendRequest / ApproveFriendRequest / DenyFriendRequest
app.post('/user/friend', printingDebuggingInfo, verifyToken, async (req, res, next) => {
    let { uid, status } = req.body;
    let friendId = req.body.fid;

    // Ensure that uid is a number
    if (isNaN(uid)) {
        console.error("ERROR: uid is not a number");

        const message = {
            message: 'User id needs to be a number',
            code: 400
        };
        return res.status(400).json(message);

    } else {
        uid = parseInt(uid);
    }

    // Ensure that friendid is a number
    if (isNaN(friendId)) {
        console.error("ERROR: Friend id is not a number:", friendId);
        const message = {
            message: 'Friend id needs to be a number',
            code: 400
        };
        return res.status(400).json(message);

    } else {
        friendId = parseInt(friendId);
    }

    // Ensure that the user is who they say they are based on token and issued userid
    if (uid !== req.decodedToken.id) {
        console.error("ERROR: uid is not the same as the user id");

        const message = {
            message: 'You are not authorized to perform this action',
            code: 401
        };

        return res.status(401).json(message);

    } else {

        /*
            How the redisGetPendingFriends (pendingFriends_uid_fid) and redisGetFriend (friends_uid) 
            key-vaue pair will look like inside redis

            -------------------------------------------------------------------------------
            | key                              | value              | TTL                 |  
            | FORMAT: pendingFriends_uid_fid   | FORMAT:            | FORMAT: seconds     |
            | FORMAT: pendingFriends_uid_fid   | "pending", "deny"  | FORMAT: seconds     |
            -------------------------------------------------------------------------------
            | pendingFriends_1_2               | pending            | 48h                 |
            | pendingFriends_2_1               | pending            | 48h                 |
            | pendingFriends_3_2               | pending            | 48h                 |
            -------------------------------------------------------------------------------
        */

        // Ensure that the user is not sending another friend request for someone who already has a pending request
        const redisGetPendingFriends = await redisClient.get(`pendingFriends_${uid}_${friendId}`);
        if (redisGetPendingFriends == "pending") {
            console.log("redisGetPendingFriends Pending!");

            const message = {
                code: 400,
                message: 'Friend request already sent',
            };

            return res.status(200).json(message);
        }

        // Ensure that the user is not adding a friend who is already his/her friend
        const redisGetFriend = await redisClient.get(`friends_${uid}`);
        if (redisGetFriend) {
            const allFriends = JSON.parse(redisGetFriend);
            console.log("allFriends:", allFriends);
            const allFriendsData = allFriends.rows; //array

            let request = false;
            let message = {};

            allFriendsData.forEach(friend => {
                if (friend.id === friendId) {
                    message = {
                        code: 400,
                        message: 'Friend already exists',
                    };

                    request = true;
                }
            });

            if (request === true) {
                console.log("request is true!");
                return res.status(200).json(message);
            }
        }

        // User is denying request
        if (status == 'deny') {
            // User is denying a friend request
            console.log("user is denying a friend request!");

            redisClient.del(`pendingFriends_${uid}_${friendId}`);
            redisClient.del(`pendingFriends_${friendId}_${uid}`);
            redisClient.del(`friends_${uid}`);
            redisClient.del(`friends_${friendId}`);

            const message = {
                code: 200,
                message: 'Friend request denied',
            };

            return res.status(200).json(message);
        }

        // User already has a pending friend request from the other user
        const redisUserFriends = await redisClient.get(`pendingFriends_${friendId}_${uid}`);


        if (redisUserFriends === "pending") {
            let stats = false;
            let message = {};

            User.addFriend(uid, friendId, (error, result) => {
                if (error) {
                    console.error("ERROR: Unable to add friend:", error);

                    return res.status(500).json(error);

                } else {

                    User.addFriend(friendId, uid, (error, result) => {
                        if (error) {
                            console.error("ERROR: Unable to add friend:", error);

                            return res.status(500).json(error);

                        } else {
                            // Invalidate the cache for this user's friends and pending friends list
                            // as well as the other friend's pending list for this particular user
                            console.log("redisUserFriends: pending!");

                            redisClient.del(`pendingFriends_${uid}_${friendId}`);
                            redisClient.del(`pendingFriends_${friendId}_${uid}`);
                            redisClient.del(`friends_${uid}`);
                            redisClient.del(`friends_${friendId}`);

                            message = {
                                code: 200,
                                message: 'Friend added',
                                rowsAffected: result.rowCount,
                            };

                            console.log("message:", message);
                            stats = true;
                            console.log("stats:", stats);
                            console.log("running to send response back!");
                            return res.status(200).json(message);
                        }
                    });
                }
            });

            // if (stats === true) {
            //     console.log("running to send response back!");
            //     return res.status(200).json(message);
            // }

        } else {

            // Else, add the friend to pendingFriendRequests in Redis and set TTL to 48hrs

            console.log("user is sending a friend request!");

            redisClient.set(`pendingFriends_${uid}_${friendId}`, 'pending', 'EX', 172800);

            const message = {
                code: 204,
                message: 'Friend request sent',
            };

            return res.status(200).json(message);

        }




    }
});

//deleteFriend
app.delete('/user/friend', printingDebuggingInfo, verifyToken, function (req, res, next) {
    const uid = req.body.uid;
    const friendid = req.body.fid;
    console.log("uid:", uid);
    console.log("friendid:", friendid);

    User.deleteFriend(uid, friendid, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                return next(err);
            }
        } else {

            if (result <= 0) {
                const response = {
                    statusCode: 404,
                    message: 'Friend Not Found',
                };

                return res.status(404).json(response);

            } else {

                User.deleteFriend(friendid, uid, (err, result) => {
                    if (err) {
                        if (err.code === '23505') {
                            return next(createHttpError(404, `Not found`));
                        }
                        else {
                            return next(err);
                        }
                    } else {
                        // Invalidate the cache for this user's friends list and pending friends list
                        redisClient.del(`friends_${uid}`);
                        redisClient.del(`friends_${friendid}`);

                        // This sentence is generally redundant as the chances of it happening is super duper slim
                        // However, i just added it to ensure the robustness of the web application
                        redisClient.del(`pendingFriends_${uid}_${friendid}`);
                        redisClient.del(`pendingFriends_${friendid}_${uid}`);

                        const response = {
                            statusCode: 200,
                            message: 'Friend Deleted'
                        };

                        return res.status(200).json(response);
                    }
                });
            }
        }
    });
});

app.post('/user/friend/:uid', printingDebuggingInfo, verifyToken, (req, res, next) => {
    let uid = req.params.uid;
    let friendId = req.body.friendId;

    if (isNaN(uid)) {
        console.error("ERROR: uid is not a number");

        const message = {
            message: 'User id needs to be a number',
            code: 400
        };
        return res.status(400).json(message);

    } else {
        uid = parseInt(uid);
    }

    if (isNaN(friendId)) {
        console.error("ERROR: Friend id is not a number");
        const message = {
            message: 'Friend id needs to be a number',
            code: 400
        };
        return res.status(400).json(message);

    } else {
        friendId = parseInt(friendId);
    }

    if (uid !== req.decodedToken.id) {
        console.error("ERROR: uid is not the same as the user id");

        const message = {
            message: 'You are not authorized to perform this action',
            code: 401
        };

        return res.status(401).json(message);

    } else {
        User.addFriend(uid, friendId, (error, result) => {
            if (error) {
                console.error("ERROR: Unable to add friend:", error);

                return res.status(500).json(error);

            } else {
                const message = {
                    code: 200,
                    message: 'Friend added',
                    rowsAffected: result.rowCount,
                };

                return res.status(200).json(message);
            }
        });
    }
})
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

//getNumOfScores
app.get('/leaderboard/:num', printingDebuggingInfo, function (req, res, next) {
    const num = req.params.num;

    console.log("num", num);

    LeaderBoard.getNumOfScores(num, function (err, result) {
        if (err) {
            if (err.code === '23505') {
                return next(createHttpError(404, `Not found`));
            }
            else {
                console.log("error:", err)
                return next(err);
            }
        } else {
            console.log("res:", result)
            return res.status(200).send({ scores: result });
        }
    });
});

//updateHighestScore
app.post('/score/:id', printingDebuggingInfo, verifyToken, verifyGoogleToken, function (req, res, next) {
    const id = req.params.id;
    const score = req.body.score;
    const game_status = req.body.game_status;

    LeaderBoard.insertNewScore(score, id, game_status, function (err, result) {
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

// Resetting password when forget
app.put('/user/reset', printingDebuggingInfo, function (req, res, next) {
    const email = req.body.email;
    const new_password = req.body.password;

    try {
        // console.log("-----------------------------------------------------------------")
        // console.log(results)
        // console.log("-----------------------------------------------------------------")
        console.log(email)

        bcrypt.hash(new_password, 10, async (err, hash) => {

            results = User.resetUserPasswordGmail(email, hash, function (error, results) {
                console.log(results)
                if (results === 0) {
                    console.log("There is no such user in the database! Ensure that you have registered with us!")
                    return res.status(404).json({ statusMessage: 'No user found' })
                }
                if (results != null) {
                    return res.status(204).json({ statusMessage: 'Completed reset.' });
                }
                if (error) {
                    return res.status(500).json({ statusMessage: 'Unable to complete reset' });
                }
            });

        });
    } catch (error) {
        return next(err);
    }

});


module.exports = app;
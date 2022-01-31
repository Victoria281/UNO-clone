const express = require('express')
const app = express()
const path = require("path");
const cors = require("cors");

// Declare dotenv, and load it into the environment
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const createHttpErrors = require('http-errors');
const ApiRouter = require('./src/controller/api');
const http = require("http");
const socketio = require("socket.io");
const { get_Current_User, user_Disconnect, join_User, get_All_Users, get_Excess_Players, get_Users_In_Room } = require("./users");
const SocketFunctions = require("./SocketFunctions");

const broadcastOne = 1;
const broadcastAll = 0;
var corsOptions = {
    origin: [
        "http://uno-clone.herokuapp.com",
        "https://uno-clone.herokuapp.com",
        "http://uno-clone-dev.herokuapp.com",
        "https://uno-clone-dev.herokuapp.com",
        "http://uno-ca1.herokuapp.com",
        "https://uno-ca1.herokuapp.com",
        "http://localhost:3000"
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//middleware
app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: [
            "http://uno-clone.herokuapp.com",
            "https://uno-clone.herokuapp.com",
            "http://uno-clone-dev.herokuapp.com",
            "https://uno-clone-dev.herokuapp.com",
            "http://uno-ca1.herokuapp.com",
            "https://uno-ca1.herokuapp.com",
            "http://localhost:3000"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));



// APIs
app.use('/api', ApiRouter);

app.get("*", (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

// 404 Handler
app.use((req, res, next) => {
    next(
        createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`),
    );
});

// Error Handler
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        error: error.message || `Unknown Error!`,
    });
});


io.on("connection", (socket) => {

    socket.on("joinWeb", (username) => {
        SocketFunctions.joinWebsite(socket.id, username);
    });

    socket.on("enteredMultiplayer", (username) => {
        var status = SocketFunctions.startMultiplayer(socket.id, username);
        console.log("Result...")
        console.log("==================================\n")

        if (status.success) {
            io.sockets.emit('multiplayerUpdate', {
                message: status.msg
            });
            if (status.removePlayer != undefined) {
                socket.leave(status.removePlayer.roomcode)

                io.sockets.in(status.removePlayer.roomcode).emit("playerLeft", {
                    state: status.removePlayer.msg,
                });
            }
        }
    });

    socket.on("notifyFriend", ({friendUsername, roomcode, username}) => {
        console.log(friendUsername)

        var socketList = SocketFunctions.notifyFriend(friendUsername, roomcode, username);
        console.log("Result...")
        console.log(socketList)
        console.log("==================================\n")

        for (var i = 0; i < socketList.length; i++) {
            io.to(socketList[i]).emit('watchFriend', {
                username: username,
                roomcode: roomcode
            });
        }
        
    });

    socket.on("exitMultiplayer", (username) => {
        const success = SocketFunctions.endMultiplayer(socket.id, username);

        console.log("Result...")
        console.log("==================================\n")

        if (success.success) {
            io.sockets.emit('multiplayerUpdate', {
                message: success.msg
            });
            if (success.removePlayer != undefined) {
                socket.leave(success.removePlayer.roomcode)

                io.sockets.in(success.removePlayer.roomcode).emit("playerLeft", {
                    state: success.removePlayer.msg,
                });
            }
        }
    });

    socket.on("ownerCreateNewRoom", ({ username, roomcode }) => {
        console.log("Player " + username + " requested to create a new room")
        const success = SocketFunctions.createNewRoom(socket.id, username, roomcode);

        console.log("Result...")
        console.log("==================================\n")

        if (success.success) {
            socket.join(success.roomcode);
            io.sockets.in(success.roomcode).emit("roomUpdate", {
                roomState: success.msg,
            });
        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    });

    socket.on("othersJoinRoom", ({ username, roomcode }) => {
        console.log(username + " or " + socket.id + " is requesting to join room")
        const success = SocketFunctions.joinNewRoom(socket.id, username, roomcode);

        console.log("Result...")
        console.log("==================================\n")

        if (success.success) {
            socket.join(success.roomcode);
            socket.emit("identity", {
                user: success.msg.user
            });
            io.sockets.in(success.roomcode).emit("roomUpdate", {
                roomState: success.msg.room,
            });
        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    });

    socket.on("sendMessage", (chat) => {
        console.log(chat.user.username + " wants to say " + chat.message + " in " + chat.user.roomcode)
        io.sockets.in(chat.user.roomcode).emit("chat", chat);

    });

    socket.on("startCheer", (roomcode) => {
        io.sockets.in(roomcode).emit("cheerReceived", {});
    });

    socket.on("startAudio", (roomcode) => {
        io.sockets.in(roomcode).emit("audioReceived", {});
    });

    socket.on("sendAudioCheer", ({roomcode, text}) => {
        console.log("to speak")
        console.log(text)
        io.sockets.in(roomcode).emit("speakReceived", text);
    });

    socket.on("moveToAudience", ({ moveToAuduser, roomcode }) => {
        console.log(moveToAuduser + " is to be moved to the audience in room " + roomcode)
        const success = SocketFunctions.moveToAudience(moveToAuduser, roomcode);

        console.log("Result...")
        console.log("==================================\n")

        if (success.success) {
            io.sockets.in(success.roomcode).emit("roomUpdate", {
                roomState: success.msg,
            });
        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    });

    socket.on("moveToPlayer", ({ moveToPlayerUser, roomcode }) => {
        console.log(moveToPlayerUser + " is to be moved to the players in room " + roomcode)
        const success = SocketFunctions.moveToPlayer(moveToPlayerUser, roomcode);

        console.log("Result...")
        console.log("==================================\n")

        if (success.success) {
            io.sockets.in(success.roomcode).emit("roomUpdate", {
                roomState: success.msg,
            });
        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    });

    socket.on('sendStartGame', (newState) => {
        console.log("Room requested to Start game")
        const success = SocketFunctions.startGame(newState)

        console.log("Result...")
        console.log("==================================\n")
        if (success.success) {
            io.to(newState.roomcode).emit('startGame', success.msg)
        } else {
            io.to(newState.roomcode).emit('errorOccured', success.msg)

        }
    })

    socket.on('sendGameUpdate', (newState) => {
        const success = SocketFunctions.updateGameState(newState.new_game_state)

        console.log("Result...")
        console.log("==================================\n")
        if (success.success) {
            io.to(newState.new_game_state.roomcode).emit('updateGame', success.msg)
        } else {
            io.to(newState.new_game_state.roomcode).emit('errorOccured', success.msg)

        }
    })

    socket.on('requestRandomRoom', ({ username }) => {
        const success = SocketFunctions.joinRandomRoom(socket.id, username)

        console.log("Result...")
        console.log(success)
        console.log("==================================\n")
        if (success.success) {
            console.log("sending back and moving player")
            console.log(success)
            socket.emit("randomRoomFound", {
                message: success.roomcode,
            });
            socket.join(success.roomcode);

            if (success.msg.room === undefined) {
                io.sockets.in(success.roomcode).emit("roomUpdate", {
                    roomState: success.msg,
                });
            } else {
                io.sockets.in(success.roomcode).emit("roomUpdate", {
                    roomState: success.msg.room,
                });
            }
        } else {
            io.to(newState.roomcode).emit('errorOccured', success.msg)
        }
    })

    socket.on('askFriendForAGame', ({ username, friendUsername }) => {
        const success = SocketFunctions.findPlayer(socket.id, username, friendUsername)

        console.log("Result...")
        console.log("==================================\n")
        if (success.success) {
            io.to(success.friend).emit('friendRequesting', {
                message: success.msg,
                requestedUser: success.requestedUser
            });

        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    })

    socket.on('acceptFriendRequest', ({ username, requestedUser }) => {
        const success = SocketFunctions.onFriendRequestAccepted(requestedUser, socket.id, username)

        console.log("Result...")
        console.log("==================================\n")
        if (success.success) {
            io.to(success.send).emit('friendRequestAccepted', {
                message: success.roomcode
            });
            socket.emit("friendRequestAccepted", {
                message: success.roomcode
            });
            socket.join(success.roomcode);
            io.sockets.in(success.roomcode).emit("roomUpdate", {
                roomState: success.msg,
            });

        } else {
            socket.emit("errorOccured", {
                message: success.msg
            });
        }
    })

    socket.on('rejectFriendRequest', ({ username, requestedUser }) => {

        console.log("Friend Request Rejected...")
        console.log("==================================\n")
        io.to(requestedUser.id).emit('friendRejected', {
            message: username
        });

    })


    //when the user gone
    socket.on("disconnect", () => {
        console.log("Player has disconnected")
        const success = SocketFunctions.disconnectMultiplayer(socket.id)

        console.log("Result...")
        console.log("==================================\n")

        // if (success.success) {
        //     if (success.roomcode != undefined){
        //         socket.leave(success.roomcode)

        //         io.sockets.in(success.roomcode).emit("playerLeft", {
        //             state: success.msg,
        //         });
        //     } 
        // }
        console.log("disconnected")


        // console.log("disconnected")
        // const p_user = user_Disconnect(socket.id);

        // if (p_user) {
        //     io.to(p_user.room).emit("message", {
        //         userId: p_user.id,
        //         username: p_user.username,
        //         text: `${p_user.username} has left the room`,
        //     });
        //     const c_user = get_All_Users(p_user.room);
        //     if (c_user)
        //         socket.to(p_user.room).emit('getUserPlayerNum', {users: c_user})
        // }
    });

    socket.on('connect_failed', function () {
        console.log('Connection Failed');
    });
});

server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})




    // ============================== UNUSED =========

    // socket.on("joinARoom", ({ username, roomcode }) => {
    //     console.log("joining")
    //     const success = joinNewRoom(socket.id, username, roomcode);
    //     if (success) {
    //         socket.join(roomcode);
    //         console.log("broadcasted")
    //         io.sockets.in(roomcode).emit("newuser", {
    //             user: success,
    //         });
    //     }
    //     console.log("joined")
    // });

    // //user has joined a room
    // socket.on("joinRoom", ({ username, roomname }) => {
    //     //check if there are already 2 ppl in the room
    //     const clients = get_Users_In_Room(roomname);
    //     console.log(clients)
    //     if (clients >= 2) {
    //         console.log("user exceeds")
    //         socket.emit("tooMuchUsers", {
    //             message: "Room is Full"
    //         });
    //     } else {
    //         //add user to the list of users
    //         const p_user = join_User(socket.id, username, roomname);
    //         console.log(typeof p_user)
    //         if (typeof p_user !== 'object') {
    //             socket.emit("alreadyConnected", {
    //                 message: "You are connected to another Room! Please try again!"
    //             });
    //             const c_user = get_All_Users(p_user);
    //             if (c_user) {
    //                 console.log("p_user")
    //                 console.log(p_user)
    //                 console.log(c_user)
    //                 socket.to(p_user).emit("getUserPlayerNum", { users: c_user });
    //             }

    //         } else {
    //             //show message to room
    //             socket.emit("message", {
    //                 userId: p_user.id,
    //                 username: "system",
    //                 text: `Welcome ${p_user.username}`,
    //             });

    //             socket.join(p_user.room);

    //             const c_user = get_All_Users(p_user);
    //             if (c_user) {
    //                 console.log("start update")
    //                 console.log(p_user)
    //                 console.log(c_user)
    //                 socket.to(p_user.room).emit("getUserPlayerNum", { users: c_user });
    //             }

    //             socket.broadcast.to(p_user.room).emit("message", {
    //                 userId: p_user.id,
    //                 username: "system",
    //                 newuser: p_user.username,
    //                 text: `${p_user.username} has joined the chat`,
    //             });
    //         }
    //     }
    // });



    // socket.on('startGame', newState => {
    //     const p_user = get_Current_User(socket.id);
    //     console.log("received start game signal")


    //     if (p_user) {
    //         const c_user = get_All_Users(p_user.room);
    //         if (c_user)
    //             socket.emit('getUserPlayerNum', { users: c_user })

    //         const clients = get_Users_In_Room(p_user.room);
    //         console.log("clients")
    //         console.log(clients)
    //         newState["usersInRoom"] = clients

    //         const excess_players = get_Excess_Players(p_user.room);
    //         console.log(excess_players)
    //         if (excess_players.length === 0) {
    //             io.to(p_user.room).emit('startGame', newState)
    //         } else {
    //             const checkExtra = excess_players.filter(player => player.username === p_user.username);
    //             if (checkExtra.length === 1) {
    //                 socket.emit("tooMuchUsers", {
    //                     message: "Room is Full"
    //                 });
    //             } else {
    //                 console.log("its not here")
    //                 io.to(p_user.room).emit('startGame', newState)
    //             }
    //         }
    //     } else {
    //         socket.emit("userNotFound");
    //     }
    // })

    // socket.on('updateGameInfo', newState => {
    //     const p_user = get_Current_User(socket.id);
    //     console.log("received update game signal")
    //     if (p_user)
    //         io.to(p_user.room).emit('updateGameInfo', newState)
    // })



    // socket.on("chat", (text) => {
    //     const p_user = get_Current_User(socket.id);
    //     console.log(p_user)
    //     io.to(p_user.room).emit("message", {
    //         userId: p_user.id,
    //         username: p_user.username,
    //         text: text,
    //     });
    // });
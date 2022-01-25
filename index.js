const express = require('express')
const app = express()
const path = require("path");
const cors = require("cors");

// Declare dotenv, and load it into the environment
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT ;
const createHttpErrors = require('http-errors');
const ApiRouter = require('./src/controller/api');
const http = require("http");
const socketio = require("socket.io");
const { get_Current_User, user_Disconnect, join_User, get_All_Users, get_Excess_Players, get_Users_In_Room } = require("./users");
const SocketFunctions = require("./SocketFunctions");

const broadcastOne = 1;
const broadcastAll = 0;
var corsOptions = {
    origin: ["http://uno-clone.herokuapp.com", "http://localhost:3000"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//middleware
app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: ["http://uno-clone.herokuapp.com", "http://localhost:3000"],
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
    socket.on("enteredMultiplayer", (username) => {
        var status = SocketFunctions.startMultiplayer(socket.id, username);
        console.log("Result...")
        console.log(status)
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

    socket.on("ownerCreateNewRoom", ({ username, roomcode }) => {
        console.log("Player " + username + " requested to create a new room")
        const success = SocketFunctions.createNewRoom(socket.id, username, roomcode);

        console.log("Result...")
        console.log(success)
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
        console.log(success)
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

    socket.on('sendStartGame', (newState) => {
        const success = SocketFunctions.startGame(newState)
        if (success.success) {
            io.to(newState.roomcode).emit('startGame', success.msg)
        } else {
            io.to(newState.roomcode).emit('errorOccured', success.msg)

        }
    })

    socket.on('sendGameUpdate', (newState) => {
        const success = SocketFunctions.startGame(newState)
        if (success.success) {
            io.to(newState.roomcode).emit('updateGame', success.msg)
        } else {
            io.to(newState.roomcode).emit('errorOccured', success.msg)

        }
    })

    socket.on('askFriendForAGame', ({ username, friendUsername }) => {
        const success = SocketFunctions.findPlayer(socket.id, username, friendUsername)

        console.log("Result...")
        console.log(success)
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
        console.log(success)
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
        console.log(success)
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
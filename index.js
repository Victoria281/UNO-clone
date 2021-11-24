const express = require('express')
const app = express()
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
const createHttpErrors = require('http-errors');
const ApiRouter = require('./src/controller/api');
const http = require("http");
const socketio = require("socket.io");
const { get_Current_User, user_Disconnect, join_User, get_All_Users } = require("./users");



//process.env.PORT
//process.env.NODE_ENV => production or undefined


//middleware
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
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
    console.error(error);
    return res.status(error.status || 500).json({
        error: error.message || `Unknown Error!`,
    });
});


io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, roomname }) => {
        const clients = io.sockets.adapter.rooms.get(roomname);
        console.log(clients)
        if (clients != undefined) {
            console.log(clients.size )

            if (clients.size >= 2) {
                console.log("user exceeds")
                socket.emit("tooMuchUsers", {
                    message: "Room is Full"
                });
            }
        }


        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        console.log(p_user);
        socket.join(p_user.room);

        socket.emit("message", {
            userId: p_user.id,
            username: "system",
            text: `Welcome ${p_user.username}`,
        });

        const c_user = get_All_Users();
        if (c_user)
        socket.emit('getUserPlayerNum', c_user)


        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: "system",
            newuser: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
    });



    socket.on('startGame', newState => {
        const p_user = get_Current_User(socket.id);
        console.log("received start game signal")


        if (p_user) {
            const clients = io.sockets.adapter.rooms.get(p_user.room);
            console.log("clients")
            console.log(clients)
            newState["usersInRoom"] = clients.size
            io.to(p_user.room).emit('startGame', newState)
        } else {
            socket.emit("userNotFound");
        }
    })

    socket.on('updateGameInfo', newState => {
        const p_user = get_Current_User(socket.id);
        console.log("received update game signal")
        if (p_user)
            io.to(p_user.room).emit('updateGameInfo', newState)
    })



    //user sending message
    socket.on("chat", (text) => {
        //gets the room user and the message sent
        console.log("reached here")
        const p_user = get_Current_User(socket.id);
        console.log(p_user)
        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });

    //when the user exits the room
    socket.on("disconnect", () => {
        console.log("disconnected")
        const p_user = user_Disconnect(socket.id);

        if (p_user) {
            io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: `${p_user.username} has left the room`,
            });
            io.to(p_user.room).emit("changePlayer", {
                playerNum: p_user.playerNum,
            });
        }
    });

    socket.on('connect_failed', function () {
        console.log('Connection Failed');
    });
});

server.listen(process.env.PORT || PORT, () => {
    console.log(`App running on port ${PORT}`)
})
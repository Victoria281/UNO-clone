const clientToRoom = {}
const rooms = {}

const testRoomState = {
    "testRoom": {
        status: "",
        players: [],
        gameState: {},
        owner: "",
        private: true
    }
}

const testPlayerRooms = {
    socketid: "roomCode"
}

const roomState = {}
const playerRooms = {}
const playersConnected = {}
const broadcastOne = 1;
const broadcastAll = 0;



var SocketFunctions = {
    startMultiplayer: function (id, username) {
        console.log("==================================")
        console.log("Servicing startMultiplayer...")
        console.log("----------------------------------")
        console.log("Player has entered multiplayer")


        var removePlayer;
        if (playerRooms[id] != undefined) {
            removePlayer = SocketFunctions.leftRoom(id, username)

            console.log("Result...")
            console.log(removePlayer)
            console.log("==================================\n")
        }
        playersConnected[username] = id



        console.log(username)
        console.log(playersConnected)
        console.log(removePlayer)

        return {
            success: true,
            send: broadcastOne,
            msg: playersConnected,
            removePlayer: removePlayer
        };
    },

    createNewRoom: function (id, username, roomcode) {
        var user = { id, username, roomcode };

        console.log("==================================")
        console.log("Servicing createNewRoom...")
        console.log("----------------------------------")
        console.log(user)
        console.log("requesting room with code " + roomcode)


        if (roomState[roomcode] == undefined && playerRooms[id] == undefined) {
            roomState[roomcode] = {
                status: false,
                players: [user],
                gameState: {},
                owner: user,
                private: true
            }
            playerRooms[id] = roomcode
            console.log("Room " + roomcode + " has been created")
            console.log("Player has been registered")
            console.log(playerRooms)
        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room could not be created. Player/Room exists"
            };
        }
        return {
            success: true,
            roomcode: roomcode,
            send: broadcastAll,
            msg: roomState[roomcode]
        };
    },

    generateCode: function (username) {
        var result = '';
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 6; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * 26));
        }

        result += username
        var arr = result.split("")
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        result = arr.join("")
        return result;
    },

    joinNewRoom: function (id, username, roomcode) {
        var user = { id, username, roomcode };

        console.log("==================================")
        console.log("Servicing joinNewRoom...")
        console.log("----------------------------------")
        console.log(user)
        console.log("requesting to join room with code " + roomcode)
        if (roomState[roomcode] != undefined) {
            if (roomState[roomcode].players.length >= 4) {
                return {
                    success: false,
                    send: broadcastOne,
                    msg: "Room is full"
                };
            } else {

                if (user.username == undefined) {
                    user.username = "Player " + roomState[roomcode].players.length
                }

                var alreadyIn = false;
                roomState[roomcode].players.map((data) => {
                    if (data.id == id) {
                        alreadyIn = true;
                    }
                })

                if (alreadyIn == false) {
                    roomState[roomcode].players.push(user)
                }
                playerRooms[id] = roomcode

                console.log("Player has joined Room " + roomcode)
                console.log("Player has been registered")
                console.log(playerRooms)

                return {
                    success: true,
                    roomcode: roomcode,
                    send: broadcastOne,
                    msg: roomState[roomcode]
                };
            }
        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room does not exist"
            };
        }
    },

    leftRoom: function (id, username) {
        //Check if player exists

        console.log("==================================")
        console.log("Servicing leftRoom...")
        console.log("----------------------------------")
        console.log("I am " + username)

        var roomcode = playerRooms[id];
        delete playerRooms[id]
        console.log("Removed from room connection ")
        console.log(playerRooms)

        if (roomState[roomcode] != undefined) {
            console.log("Filtering out player in room if room exists")
            roomState[roomcode].players = roomState[roomcode].players.filter((data, index) => data.username != username);

            if (roomState[roomcode].players.length != 0) {
                if (roomState[roomcode].status == true) {
                    console.log("Player was playing a game")
                    roomState[roomcode].status = false
                }
                return {
                    success: true,
                    roomcode: roomcode,
                    send: broadcastAll,
                    msg: roomState[roomcode]
                };
            } else {
                delete roomState[roomcode];
            }
        }


    },

    disconnectMultiplayer: function (id) {
        //Check if player exists

        console.log("==================================")
        console.log("Servicing disconnectMultiplayer...")
        console.log("----------------------------------")
        console.log("I am " + id)

        console.log("Remove from connection")
        var username;
        for (key in playersConnected) {
            if (playersConnected[key] == id) {
                username = key
                break;
            }
        }
        delete playersConnected[username]
    },

    startGame: function (game_state) {
        if (roomState[game_state.roomcode] != undefined) {
            roomState[game_state.roomcode].status = true
            roomState[game_state.roomcode].gameState = game_state
            return {
                success: true,
                send: broadcastAll,
                msg: roomState[game_state.roomcode]
            };
        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room does not exist"
            };
        }
    },

    updateGameState: function (game_state) {
        if (roomState[game_state.roomcode] != undefined) {
            roomState[game_state.roomcode].gameState = game_state
            return {
                success: true,
                send: broadcastAll,
                msg: roomState[game_state.roomcode]
            };
        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room does not exist"
            };
        }
    },

    findPlayer: function (id, username, friendUsername) {
        var user = { id, username };

        console.log("==================================")
        console.log("Servicing findPlayer...")
        console.log("----------------------------------")
        console.log(user)
        console.log(" requesting for " + friendUsername)

        var friendId = playersConnected[friendUsername]
        if (friendId == undefined) {
            return {
                success: false,
                send: broadcastOne,
                msg: "Friend is not playing"
            };
        } else if (playerRooms[id] != undefined || playerRooms[friendId] != undefined) {
            return {
                success: false,
                send: broadcastOne,
                msg: "Someone is already in game"
            };
        } else {
            console.log(playerRooms)
            return {
                success: true,
                friend: friendId,
                requestedUser: user,
                msg: "Friend " + username + " wants to play with you"
            };
        }
    },

    onFriendRequestAccepted: function (requestedUser, acceptedId, acceptedUsername) {


        console.log("==================================")
        console.log("Servicing onFriendRequestAccepted...")
        console.log("----------------------------------")
        console.log(acceptedUsername + " accepted friend request for ")
        console.log(requestedUser)

        if (playerRooms[requestedUser.id] != undefined && playerRooms[acceptedId] != undefined) {
            return {
                success: false,
                send: broadcastOne,
                msg: "Friend is already in game"
            };
        } else {
            var roomcode = SocketFunctions.generateCode(requestedUser.username);
            var acceptedUser = { id: acceptedId, username: acceptedUsername, "roomcode": roomcode }
            requestedUser["roomcode"] = roomcode
            roomState[roomcode] = {
                status: false,
                players: [acceptedUser],
                gameState: {},
                owner: acceptedUser,
                private: true
            }
            playerRooms[acceptedUser.id] = roomcode
            return {
                success: true,
                roomcode: roomcode,
                send: requestedUser.id,
                msg: roomState[roomcode]
            };
        }
    },
}

//---------------------------------------------
//exports
//---------------------------------------------
module.exports = SocketFunctions;


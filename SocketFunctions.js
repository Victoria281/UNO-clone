const clientToRoom = {}
const rooms = {}

const testRoomState = {
    "testRoom": {
        status: "",
        players: [],
        audience: [],
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
const playersOnline = {}
const broadcastOne = 1;
const broadcastAll = 0;



var SocketFunctions = {
    joinWebsite: function (id, username) {
        console.log("==================================")
        console.log("Servicing joinWebsite...")
        console.log("----------------------------------")

        playersOnline[username] = id
        console.log(playersOnline)
    },

    notifyFriend: function (friendUsername, roomcode, username) {
        console.log("==================================")
        console.log("Servicing notifyFriend...")
        console.log("----------------------------------")
        var socketList = [];
        for (var i = 0; i < friendUsername.length; i++) {
            if (playersOnline[friendUsername[i].username] !== undefined) {
                socketList.push(playersOnline[friendUsername[i].username])
            }
        }
        return socketList;
    },

    startMultiplayer: function (id, username) {
        console.log("==================================")
        console.log("Servicing startMultiplayer...")
        console.log("----------------------------------")
        console.log("Player has entered multiplayer")


        var removePlayer;
        if (playerRooms[id] != undefined) {
            removePlayer = SocketFunctions.leftRoom(id, username)

            console.log("Result...")
            console.log("==================================\n")
        }
        playersConnected[username] = id

        return {
            success: true,
            send: broadcastOne,
            msg: playersConnected,
            removePlayer: removePlayer
        };
    },

    endMultiplayer: function (id, username) {
        console.log("==================================")
        console.log("Servicing endMultiplayer...")
        console.log("----------------------------------")
        console.log("Player has left multiplayer")

        var removePlayer;
        if (username != undefined) {
            if (playerRooms[id] != undefined) {
                removePlayer = SocketFunctions.leftRoom(id, username)

                console.log("Result...")
                console.log("==================================\n")
            }
            if (playersConnected[username] = id) {
                delete playersConnected[username]
            }
        }

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
                audience: [],
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
            if ((roomState[roomcode].players.length + roomState[roomcode].audience.length) >= 10) {
                return {
                    success: false,
                    send: broadcastOne,
                    msg: "Room is full"
                };
            } else {

                if (user.username == undefined) {
                    user.username = "Guest User " + (roomState[roomcode].players.length + roomState[roomcode].audience.length)
                }

                var alreadyIn = false;
                roomState[roomcode].players.map((data) => {
                    if (data.id == id) {
                        alreadyIn = true;
                    }
                })
                roomState[roomcode].audience.map((data) => {
                    if (data.id == id) {
                        alreadyIn = true;
                    }
                })


                if (alreadyIn == false) {
                    if (roomState[roomcode].players.length >= 4 || roomState[roomcode].status == true) {
                        roomState[roomcode].audience.push(user)
                    } else {
                        roomState[roomcode].players.push(user)
                    }
                }
                playerRooms[id] = roomcode

                console.log("Player has joined Room " + roomcode)
                console.log("Player has been registered")

                return {
                    success: true,
                    roomcode: roomcode,
                    send: broadcastOne,
                    msg: {
                        room: roomState[roomcode],
                        user: user
                    }
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

    moveToAudience: function (moveToAudUser, roomcode) {
        console.log("==================================")
        console.log("Servicing moveToAudience...")
        console.log("----------------------------------")
        console.log(moveToAudUser + " is to be moved to the audience in room " + roomcode)

        if (roomState[roomcode] != undefined) {

            var alreadyIn = false;
            var movedUser;
            var movedIndex;
            roomState[roomcode].players.map((data, i) => {
                if (data.username == moveToAudUser) {
                    alreadyIn = true;
                    movedUser = data
                    movedIndex = i
                }
            })
            roomState[roomcode].audience.map((data, i) => {
                if (data.username == moveToAudUser) {
                    movedUser = data
                }
            })

            if (alreadyIn != false) {
                if (movedUser != undefined && movedIndex != undefined) {
                    roomState[roomcode].players = roomState[roomcode].players.slice(0, movedIndex).concat(roomState[roomcode].players.slice(movedIndex + 1))
                    roomState[roomcode].audience.push(movedUser)
                }
            }
            return {
                success: true,
                send: broadcastOne,
                roomcode: roomcode,
                msg: roomState[roomcode]
            };

        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room does not exist"
            };
        }
    },

    moveToPlayer: function (moveToPlayerUser, roomcode) {
        console.log("==================================")
        console.log("Servicing moveToPlayer...")
        console.log("----------------------------------")
        console.log(moveToPlayerUser + " is to be moved to the players in room " + roomcode)

        if (roomState[roomcode] != undefined) {

            var alreadyIn = false;
            var movedUser;
            var movedIndex;
            roomState[roomcode].players.map((data, i) => {
                if (data.username == moveToPlayerUser) {
                    movedUser = data
                }
            })
            roomState[roomcode].audience.map((data, i) => {
                if (data.username == moveToPlayerUser) {
                    alreadyIn = true;
                    movedUser = data
                    movedIndex = i
                }
            })

            if (alreadyIn != false) {
                if (movedUser != undefined && movedIndex != undefined && roomState[roomcode].players.length < 4) {
                    roomState[roomcode].audience = roomState[roomcode].audience.slice(0, movedIndex).concat(roomState[roomcode].audience.slice(movedIndex + 1))
                    roomState[roomcode].players.push(movedUser)
                }
            }
            return {
                success: true,
                send: broadcastOne,
                roomcode: roomcode,
                msg: roomState[roomcode]
            };

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
            roomState[roomcode].players = roomState[roomcode].players.filter((data, index) => data.id != id);
            roomState[roomcode].audience = roomState[roomcode].audience.filter((data, index) => data.id != id);


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

        var removePlayer;
        if (playerRooms[id] != undefined) {
            removePlayer = SocketFunctions.leftRoom(id, username)

            console.log("Result...")
            console.log("==================================\n")
        }

        delete playersConnected[username]

        return {
            success: true,
            send: broadcastOne,
            removePlayer: removePlayer
        };

    },

    startGame: function (game_state) {

        console.log("==================================")
        console.log("Servicing startGame...")
        console.log("----------------------------------")
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

        console.log("==================================")
        console.log("Servicing updateGameState...")
        console.log("----------------------------------")
        if (roomState[game_state.roomcode] != undefined) {
            roomState[game_state.roomcode].gameState = game_state
            return {
                success: true,
                send: broadcastAll,
                msg: roomState[game_state.roomcode].gameState
            };
        } else {
            return {
                success: false,
                send: broadcastOne,
                msg: "Room does not exist"
            };
        }
    },

    createRandomRoom: function (id, username) {
        var roomcode = SocketFunctions.generateCode(username);

        var user = { id, username, roomcode };

        console.log("==================================")
        console.log("Servicing createRandomRoom...")
        console.log("----------------------------------")
        console.log(user)
        console.log("requesting for a random room " + roomcode)


        if (roomState[roomcode] == undefined && playerRooms[id] == undefined) {
            roomState[roomcode] = {
                status: false,
                players: [user],
                gameState: {},
                owner: user,
                private: false,
                audience: []
            }
            playerRooms[id] = roomcode
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

    joinRandomRoom: function (id, username) {

        console.log("==================================")
        console.log("Servicing joinRandomRoom...")
        console.log("----------------------------------")
        console.log(username + " requesting for a random room")

        if (playerRooms[id] == undefined) {
            var roomFound = false;
            for (var key in roomState) {
                if (roomState[key].status == false && roomState[key].private == false) {
                    if (roomState[key].players.length < 4) {
                        roomFound = true;
                        console.log("Random Room found!")
                        return SocketFunctions.joinNewRoom(id, username, key)
                    }
                }
            }
            if (roomFound == false) {
                console.log("Random Room not found!")
                return SocketFunctions.createRandomRoom(id, username)
            }
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
                private: true,
                audience: []
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


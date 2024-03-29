//@ts-nocheck
import { LocalConvenienceStoreOutlined } from "@material-ui/icons"
import {
    generateRoomCode
} from "../../features/multiplayer/rooms"
import {
    getAllFriends
} from "../../features/multiplayer/friends"

export const UPDATE_FRIENDS = "UPDATE_FRIENDS"
export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM"
export const JOIN_A_ROOM = "JOIN_A_ROOM"
export const UPDATE_ROOM = "UPDATE_ROOM"
export const UPDATE_FRIEND_REQUESTS = "UPDATE_FRIEND_REQUESTS"
export const INIT_STATE = "INIT_STATE"
export const UPDATE_IDENTITY = "UPDATE_IDENTITY"
export const UPDATE_CHAT_MESSAGE = "UPDATE_CHAT_MESSAGE"

export const initialiseState = () => async dispatch => {
    // API CALL FRIENDS
    var start = {
        roomcode: "",
        status: false,
        players: [],
        audience: [],
        owner: "",
        private: null,
        friends: [],
        friendRequests: [],
        gameState: {}
    }
    dispatch({
        type: INIT_STATE,
        start
    });
}

export const enterMultiplayer = (username, socket, uid, token) => async dispatch => {
    // API CALL FRIENDS
    getAllFriends(uid, token).then((friends) => {
        friends.map((data) => {
            data["status"] = false;
            data["requested"] = false
        })
        dispatch({
            type: UPDATE_FRIENDS,
            friends
        });
        socket.emit('enteredMultiplayer', username)
    })
    // var friends = [
    //     { username: "t2", status: false, requested: false },
    //     { username: "t1", status: false, requested: false },
    //     { username: "r1", status: false, requested: false },
    //     { username: "r2", status: false, requested: false },
    //     { username: "r3", status: false, requested: false },
    //     { username: "r4", status: false, requested: false },
    //     { username: "r5", status: false, requested: false },
    // ]
    // dispatch({
    //     type: UPDATE_FRIENDS,
    //     friends
    // });
}

export const notifyFriends = (roomcode, username, socket) => async (dispatch, getState) => {
    // API CALL FRIENDS
    const friends = getState().multiplayer_rooms.friends;
    var data = {
        friendUsername: friends,
        roomcode: roomcode,
        username: username
    }
    socket.emit('notifyFriend', data)

}

export const receivedMessage = (message) => async (dispatch, getState) => {
    const roomstate = getState().multiplayer_rooms;
    console.log(message)
    roomstate.chat.push({
        username: message.user.username,
        text: message.message
    })
    dispatch({
        type: UPDATE_CHAT_MESSAGE,
        roomstate
    });
}

export const sendMessage = (message, socket) => async (dispatch, getState) => {
    const roomstate = getState().multiplayer_rooms;
    var data = {
        message: message,
        user: roomstate.user,
    }
    console.log("telling socket of the message")
    socket.emit('sendMessage', data)
}



export const movePlayerToAudience = (moveToAuduser, socket) => async (dispatch, getState) => {
    const roomcode = getState().multiplayer_rooms.owner.roomcode;
    var data = {
        moveToAuduser: moveToAuduser,
        roomcode: roomcode
    }
    socket.emit('moveToAudience', data)
}

export const moveAudienceToPlayer = (moveToPlayerUser, socket) => async (dispatch, getState) => {
    const roomcode = getState().multiplayer_rooms.owner.roomcode;
    var data = {
        moveToPlayerUser: moveToPlayerUser,
        roomcode: roomcode
    }
    socket.emit('moveToPlayer', data)
}

export const receiveListOfClients = (data) => async (dispatch, getState) => {
    const friends = getState().multiplayer_rooms.friends;
    friends.map((friendData, i) => {
        if (data.message[friendData.username] != undefined) {
            friendData.status = true;
        } else {
            friendData.status = false;
        }
    })
    dispatch({
        type: UPDATE_FRIENDS,
        friends
    });
}

export const createNewRoom = (roomName, username, socket) => async dispatch => {
    const roomcode = generateRoomCode(roomName, username)
    socket.emit("ownerCreateNewRoom", { username, roomcode });
    if (roomcode != "") {
        dispatch({
            type: CREATE_NEW_ROOM,
            roomcode: roomcode,
        });
    }
    return roomcode
}

export const joinRoom = (roomcode, username, socket) => async (dispatch, getState) => {
    console.log("in dispatch to join room")
    socket.emit("othersJoinRoom", { username, roomcode });
    if (roomcode != "") {
        dispatch({
            type: JOIN_A_ROOM,
            start: {
                roomcode: roomcode,
                status: false
            },
        });
    }
    return roomcode
}

export const joinRandomRoom = (username, socket) => async dispatch => {
    socket.emit("requestRandomRoom", { username });
}

export const sendRequestFriend = (username, socket, friendUsername) => async (dispatch, getState) => {
    const friends = getState().multiplayer_rooms.friends;
    friends.map((friendData, i) => {
        if (friendData.username == friendUsername) {
            friendData.requested = true;
        }
    })
    dispatch({
        type: UPDATE_FRIENDS,
        friends
    });
    socket.emit("askFriendForAGame", { username, friendUsername });
}

export const receiveRequestToPlay = (data) => async (dispatch, getState) => {
    console.log(data.requestedUser)
    var friendRequests = getState().multiplayer_rooms.friendRequests;
    var hasRequested = false;
    friendRequests.map((friendData, i) => {
        console.log(friendData)
        if (friendData.username == data.requestedUser.username) {
            hasRequested = true;
        }
    })

    if (hasRequested == false) {
        friendRequests.push(data.requestedUser)
        dispatch({
            type: UPDATE_FRIEND_REQUESTS,
            friendRequests
        });
        setTimeout(() => {
            console.log("Request time up")
            friendRequests = friendRequests.filter((fdata, index) => fdata.username != data.requestedUser.username);
            dispatch({
                type: UPDATE_FRIEND_REQUESTS,
                friendRequests
            });
        }, 5000);

    }

}

export const acceptFriendRequestGame = (username, socket, requestedUser) => async dispatch => {
    socket.emit("acceptFriendRequest", { username, requestedUser });
}

export const rejectFriendRequestGame = (username, socket, requestedUser) => async (dispatch, getState) => {
    socket.emit("rejectFriendRequest", { username, requestedUser });
    var friendRequests = getState().multiplayer_rooms.friendRequests;
    friendRequests = friendRequests.filter((fdata, index) => fdata.username != requestedUser.username);
    dispatch({
        type: UPDATE_FRIEND_REQUESTS,
        friendRequests
    });
}

export const onFriendRequestGameRejected = (friendUsername) => async (dispatch, getState) => {
    const friends = getState().multiplayer_rooms.friends;
    var friendIndex;
    friends.map((friendData, i) => {
        if (friendData.username == friendUsername) {
            friendIndex = i
            friendData.requested = "rejected";
        }
    })
    dispatch({
        type: UPDATE_FRIENDS,
        friends
    });
    setTimeout(() => {
        console.log("Request time up")
        friends[friendIndex].requested = false;
        dispatch({
            type: UPDATE_FRIENDS,
            friends
        });
    }, 5000);
}

export const updateOwnIdentity = (user) => async dispatch => {
    console.log("Who am i?")
    console.log(user)
    dispatch({
        type: UPDATE_IDENTITY,
        user: user.user,
    });
}

export const roomUpdated = (roomState) => async dispatch => {
    dispatch({
        type: UPDATE_ROOM,
        roomState,
    });
}

// export const playWithFriend = (socket, friendname, username) => async dispatch => {
//     socket.emit("requestFriendGame", { friendname, username });
// }

// export const playWithFriendAccepted = (socket, friendname) => async dispatch => {
//     dispatch({
//         type: ACCEPT_PLAY_REQUEST,
//         accept: true
//     });
// }

// export const playWithFriendRejected = (socket, friendname, username) => async dispatch => {
//     socket.emit("requestFriendGameRejected", { friendname, username });
// }

// export const onPlayWithFriendRequested = (friendname, username, socket) => async (dispatch, getState) => {
//     console.log("Times start")
//     setTimeout(() => {
//         console.log("Times up")
//         const play_request_accepted = getState().multiplayer_rooms.request;
//         if (play_request_accepted) {
//             const roomcode = generateRoomCode(username, friendname)
//             socket.emit("createRoomWithFriend", { username, friendname, roomcode });
//             if (roomcode != "") {
//                 dispatch({
//                     type: RESET_PLAY_REQUEST,
//                     accept: false,
//                     roomcode,
//                     owner: true
//                 });
//             }
//             return roomcode
//         } else {
//             socket.emit("requestFriendGameRejected", { friendname, username });
//         }
//     }, 5000);
// }

// export const onCreateRoomWithFriend = (friendname, username, socket) => async (dispatch, getState) => {
// }


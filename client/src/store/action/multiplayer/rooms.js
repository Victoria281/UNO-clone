import {
    generateRoomCode
} from "../../features/multiplayer/rooms"

export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM"
export const JOIN_A_ROOM = "JOIN_A_ROOM"
export const ACCEPT_PLAY_REQUEST = "ACCEPT_PLAY_REQUEST"
export const RESET_PLAY_REQUEST = "RESET_PLAY_REQUEST"


export const createNewRoom = (roomName, username, socket) => async dispatch => {
    const roomcode = generateRoomCode(roomName, username)
    socket.emit("createRoom", { username, roomcode });
    if (roomcode != "") {
        dispatch({
            type: CREATE_NEW_ROOM,
            roomcode,
            owner: true
        });
    }
    return roomcode
}

export const joinRoom = (socket, roomcode, username) => async dispatch => {
    socket.emit("joinARoom", { username, roomcode });
    dispatch({
        type: JOIN_A_ROOM,
        roomcode,
        owner: false
    });
}

export const playWithFriend = (socket, friendname, username) => async dispatch => {
    socket.emit("requestFriendGame", { friendname, username });
}

export const playWithFriendAccepted = (socket, friendname) => async dispatch => {
    dispatch({
        type: ACCEPT_PLAY_REQUEST,
        accept: true
    });
}

export const playWithFriendRejected = (socket, friendname, username) => async dispatch => {
    socket.emit("requestFriendGameRejected", { friendname, username });
}

export const onPlayWithFriendRequested = (friendname, username, socket) => async (dispatch, getState) => {
    console.log("Times start")
    setTimeout(() => {
        console.log("Times up")
        const play_request_accepted = getState().multiplayer_rooms.request;
        if (play_request_accepted){
            const roomcode = generateRoomCode(username, friendname)
            socket.emit("createRoomWithFriend", { username, friendname, roomcode });
            if (roomcode != "") {
                dispatch({
                    type: RESET_PLAY_REQUEST,
                    accept: false,
                    roomcode,
                    owner: true
                });
            }
            return roomcode
        } else {
            socket.emit("requestFriendGameRejected", { friendname, username });
        }
    }, 5000);
}

export const onCreateRoomWithFriend = (friendname, username, socket) => async (dispatch, getState) => {
}


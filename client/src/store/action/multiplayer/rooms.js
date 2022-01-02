import {
    generateRoomCode
} from "../../../features/multiplayer/rooms"

export const CREATE_NEW_ROOM = "CREATE_NEW_ROOM"
export const JOIN_A_ROOM = "JOIN_A_ROOM"


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



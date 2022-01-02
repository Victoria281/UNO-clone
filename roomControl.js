const clientToRoom = {}
const rooms = {}

function createNewRoom(id, username, roomcode) {
    var user = { id, username, roomcode };
    if (rooms[roomcode] == undefined) {
        rooms[roomcode] = {}
        rooms[roomcode] = [user]
        clientToRoom[id] = roomcode
    } else {
        return;
    }
    return rooms[roomcode]
}

function joinNewRoom(id, username, roomcode) {
    if (username == undefined) {
        username = "guest"
    }
    var user = { id, username, roomcode };
    if (rooms[roomcode] != undefined) {
        rooms[roomcode].push(user)
        clientToRoom[id] = roomcode
    } else {
        return
    }
    return rooms[roomcode]
}

function leftRoom(id) {
    var roomcode = clientToRoom[id];
    if (roomcode) {
        delete clientToRoom[id]
        rooms[roomcode] = rooms[roomcode].filter((data, index) => data.id != id);
    }
    const success = rooms[roomcode]
    return {roomcode, success}
}

module.exports = {
    createNewRoom,
    joinNewRoom,
    leftRoom
}
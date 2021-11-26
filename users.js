const c_users = [];

function join_User(id, username, room) {
    var p_user = { id, username, room };
    const userExists = c_users.findIndex((p_user) => p_user.username === username);
    if (userExists != -1) {
        const room = c_users[userExists].room;
        c_users.splice(userExists, 1)
        const playersInRoom = c_users.filter(player => player.room === room);
        c_users[c_users.indexOf(playersInRoom[0])]["playerNum"] = 1;
        
        return room
    }

    c_users.push(p_user)
    const playerRooms = c_users.filter(player => player.room === room);
    for (var i = 0; i < playerRooms.length; i++) {
        var temp = i;
        playerRooms[i]["playerNum"] = temp + 1;
        c_users[c_users.indexOf(playerRooms[i])]["playerNum"] = temp + 1;
    }

    

    console.log(c_users, "users");
    return p_user;
}

function get_Excess_Players(room) {
    const playerRooms = c_users.filter(player => player.room === room);
    return playerRooms.slice(2, playerRooms.length);
}

function get_Users_In_Room(room) {
    const playerRooms = c_users.filter(player => player.room === room);
    return playerRooms.length;
}

console.log("user out", c_users);

function get_Current_User(id) {
    return c_users.find((p_user) => p_user.id === id);
}
function get_All_Users(room) {
    return c_users.filter(player => player.room === room);
}



function user_Disconnect(id) {
    const index = c_users.findIndex((p_user) => p_user.id === id);
    const puser = c_users[index];
    if (index !== -1) {
        c_users.splice(index, 1)
        console.log("remove players")
        console.log(c_users)
        const roomOfPlayer = c_users.filter(player => player.room === puser.room);
        for (var i = 0; i < roomOfPlayer.length; i++) {
            var temp = i;
            roomOfPlayer[i]["playerNum"] = temp + 1;
            c_users[c_users.indexOf(roomOfPlayer[i])]["playerNum"] = temp + 1;
        }

        return puser;
    }
}

module.exports = {
    join_User,
    get_Current_User,
    user_Disconnect,
    get_All_Users,
    get_Excess_Players,
    get_Users_In_Room
};
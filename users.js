const c_users = [];

function join_User(id, username, room) {
    const p_user = { id, username, room };
    c_users.push(p_user)
    const playerRooms = c_users.filter(player => player.room === room);
    
    if (playerRooms.length >=3){
        playerRooms = playerRooms.slice(0,2);
    }

    var userExists = false;
    for (var i = 0; i < playerRooms.length; i++) {
        var temp = i;
        playerRooms[i]["playerNum"] = temp + 1;
        c_users[c_users.indexOf(playerRooms[i])]["playerNum"] = temp + 1;
        if (playerRooms[i]["username"] === username){
            userExists = true
        }
    }

    if (userExists === false){
        p_user = "full"
    }

    console.log(c_users, "users");
    return p_user;
}

function get_Excess_Players(room){
    const playerRooms = c_users.filter(player => player.room === room);
    return playerRooms.slice(2, playerRooms.length);
}

function get_Users_In_Room(room){
    const playerRooms = c_users.filter(player => player.room === room);
    return playerRooms.length;
}

console.log("user out", c_users);

function get_Current_User(id) {
    return c_users.find((p_user) => p_user.id === id);
}
function get_All_Users() {
    return c_users;
}



function user_Disconnect(id) {
    const index = c_users.findIndex((p_user) => p_user.id === id);

    if (index !== -1) {
        c_users.splice(index, 1)
        console.log("remove players")
        console.log(c_users)
        for (var i = 0; i < c_users.length; i++) {
            var temp = i;
            c_users[i]["playerNum"] = temp + 1;
        }

        return c_users[0];
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
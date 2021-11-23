const c_users = [];

function join_User(id, username, room) {
    const p_user = { id, username, room };
    c_users.push(p_user)
    const playerRooms = c_users.filter(player => player.room === room);
    

    for (var i = 0; i < playerRooms.length; i++) {
        var temp = i;
        playerRooms[i]["playerNum"] = temp + 1;
        c_users[c_users.indexOf(playerRooms[i])]["playerNum"] = temp + 1;
    }


    console.log(c_users, "users");
    p_user["playerNum"] = c_users[c_users.length - 1]["playerNum"]

    return p_user;
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
};
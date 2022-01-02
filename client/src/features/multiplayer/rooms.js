export const generateRoomCode = (roomName, username) => {
    var shuffled = "";
    if (roomName!= "" && username!=""){
        var str = roomName+username;
        shuffled = str.split('').sort(function(){return 0.5-Math.random()}).join('');
    }
    return shuffled
}
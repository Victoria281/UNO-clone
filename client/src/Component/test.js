// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'


//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [gameStarted, setGameStarted] = useState(false)
    const [otherPlayers, setOtherPlayers] = useState([])
    const [selectColorModalOpen, setSelectColorModalOpen] = useState(false);
    const [fren, setFren] = useState({});
    const owner = useSelector(state => state.multiplayer_rooms.owner)
    const game_state = useSelector(state => state.multiplayer_game)
    const room_state = useSelector(state => state.multiplayer_rooms)

    // console.log(game_state)
    // console.log(room_state)

    const requestFriend = () => {

    }

    useEffect(() => {
        var username = localStorage.getItem("username")
        socket.emit('enteredMultiplayer', username)
    }, []);

    useEffect(() => {
        socket.on("errorOccured", (data) => {
            console.log("ERROR")
            console.log(data)
        });

        socket.on("multiplayerCompleted", (data) => {
            console.log("multiplayer")
            console.log(data)
        });

        socket.on("roomUpdate", (data) => {
            console.log("there is an update to your room")
            console.log(data)
        });

        socket.on("playerLeft", (data) => {
            console.log("someone left")
            console.log(data)
        });

        socket.on("friendRequesting", (data) => {
            console.log("someone wants to play with you")
            console.log(data)
            setFren(data.requestedUser)
        });

        socket.on("friendRequestAccepted", (data) => {
            console.log("Your friend Request was accepted")
            console.log(data)
            var username = localStorage.getItem("username")
            var newRoom = {
                username: username,
                roomcode: data.message
            }
            socket.emit('othersJoinRoom', newRoom)
        });


    }, [socket]);

    return (

        <>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        username: username,
                        roomcode: "testingehrer"
                    }
                    socket.emit('ownerCreateNewRoom', newRoom)
                }}>
                <p>Create Room</p>
            </div>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        username: username,
                        roomcode: "testingehrer"
                    }
                    socket.emit('othersJoinRoom', newRoom)
                }}>
                <p>Join Room</p>
            </div>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        username: username,
                    }
                    socket.emit('requestRandomRoom', newRoom)
                }}>
                <p>Join Random Room</p>
            </div>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        username: username,
                        friendUsername: "t2",
                    }
                    socket.emit('askFriendForAGame', newRoom)
                }}>
                <p>Request Friend</p>
            </div>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        requestedUser: fren,
                        username: username,
                    }
                    socket.emit('acceptFriendRequest', newRoom)
                }}>
                <p>Accept Friend</p>
            </div>
            <div
                onClick={() => {
                    var username = localStorage.getItem("username")
                    var newRoom = {
                        username: username,
                        friendUsername: "t2",
                    }
                    socket.emit('rejectFriendRequest', newRoom)
                }}>
                <p>Reject Friend</p>
            </div>
        </>
    );
}
export default GameRoom;
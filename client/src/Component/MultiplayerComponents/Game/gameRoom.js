// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    prepareGameMaterials,
    startGameDetected,
    updateGameDetected,
} from "../../../store/action/multiplayer/game"

import {
    joinRoom,
    roomUpdated,
    updateOwnIdentity
} from "../../../store/action/multiplayer/rooms"
import Player from "./gameComponents/Player"
import OtherPlayer from "./gameComponents/OtherPlayers"
import Deck from "./gameComponents/Deck"
import {
    Box,
    Grid
} from '@mui/material';
import SelectColorModal from "./gameComponents/SelectColorModal"
import WaitingRoom from "./userComponents/waitingRoom"
import GameArea from "./userComponents/gameArea"

//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [otherPlayers, setOtherPlayers] = useState([])
    const room_state = useSelector(state => state.multiplayer_rooms)

    console.log("herer")
    console.log(username)
    const handleStart = () => {
        console.log("start game pressed")
        // if (room_state.players.length > 1) {
            dispatch(prepareGameMaterials(socket))
        // }
    }

    useEffect(() => {
        console.log("Joining the room")
        dispatch(joinRoom(roomcode, username, socket))
    }, []);

    useEffect(() => {
        socket.on("identity", (data) => {
            dispatch(updateOwnIdentity(data))
            setUsername(data.user.username)
        });

        socket.on("roomUpdate", (data) => {
            console.log("ROOM STUFFFFF")
            console.log(data)
            dispatch(roomUpdated(data.roomState))
        });

        socket.on("playerLeft", (data) => {
            console.log(data)
            dispatch(roomUpdated(data.state))
        });

        socket.on("startGame", (data) => {
            console.log("Socket wants to start the game")
            dispatch(startGameDetected(data))
        });

        socket.on("updateGame", (data) => {
            console.log("update game detected")
            dispatch(updateGameDetected(data))
        });

        socket.on("errorOccured", (data) => {
            console.log("ERRORRR")
            console.log(data)
            // window.location = "/"
        });

    }, [socket]);

    return (
        <>
            {
                username == null || room_state.status != true ?
                    <WaitingRoom 
                    roomcode={roomcode} 
                    handleStart={handleStart}
                    socket={socket}
                     />
                    :
                    <GameArea 
                    otherPlayers={otherPlayers} 
                    socket={socket} />
                    
            }
        </>
    );
}
export default GameRoom;
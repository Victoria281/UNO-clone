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
    updateOwnIdentity,
    receivedMessage
} from "../../../store/action/multiplayer/rooms"
import Player from "./gameComponents/Player"
import OtherPlayer from "./gameComponents/OtherPlayers"
import Deck from "./gameComponents/Deck"
import {
    Box,
    Grid,
    Button
} from '@mui/material';
import SelectColorModal from "./gameComponents/SelectColorModal"
import WaitingRoom from "./userComponents/waitingRoom"
import GameArea from "./userComponents/gameArea"
import ChatArea from "./userComponents/chatArea"
import AudienceOptions from "./userComponents/audienceRooms"
import AudienceIcon from "./userComponents/AudienceIcon"
import Cheering from "./userComponents/audio/cheer.wav"
import { useSpeechSynthesis } from "react-speech-kit";


//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [otherPlayers, setOtherPlayers] = useState([])
    const [startCheer, setStartCheer] = useState(false)
    const [talk, setTalk] = useState(false)
    const [talkMessage, setTalkMessage] = useState("")
    const room_state = useSelector(state => state.multiplayer_rooms)
    const audienceMember = useSelector(state => {
        var isAud = true;
        state.multiplayer_rooms.players.map((player) => {
            if (player.username === username) {
                isAud = false;
            }
        })
        return isAud;
    })


    const { speak } = useSpeechSynthesis();


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
        console.log("talk is changed")
        console.log(talk)
        if (talk !== false){
            console.log("Im talkinggg")
            speak({ text: talk })
            setTalk(false)
        }
    }, [talk]);

    const handlePlay = () => {
        var audio = new Audio(Cheering)
        audio.play()
    }


    useEffect(() => {
        socket.on("identity", (data) => {
            dispatch(updateOwnIdentity(data))
            setUsername(data.user.username)
        });
        socket.on("chat", (data) => {
            console.log("received message update")
            console.log(data)
            dispatch(receivedMessage(data))
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

        socket.on("cheerReceived", () => {
            console.log("cheerReceived")
            setStartCheer(true)
        });

        socket.on("audioReceived", () => {
            console.log("audiorevceived")
            handlePlay()
        });

        socket.on("speakReceived", (data) => {
            setTalk(data);
        });

    }, [socket]);

    return (
        <>
            {
                username === null || room_state.status !== true ?
                    <WaitingRoom
                        roomcode={roomcode}
                        handleStart={handleStart}
                        socket={socket}
                    />
                    :
                    <>
                        <GameArea
                            otherPlayers={otherPlayers}
                            socket={socket} />
                        {audienceMember &&
                            <AudienceOptions
                                socket={socket}
                                roomcode={roomcode}
                            />
                        }
                        <AudienceIcon startCheer={startCheer} setStartCheer={setStartCheer} />
                    </>
            }
            {
                username !== null &&
                <ChatArea
                    roomcode={roomcode}
                    username={username}
                    socket={socket}
                />
            }
        </>
    );
}
export default GameRoom;
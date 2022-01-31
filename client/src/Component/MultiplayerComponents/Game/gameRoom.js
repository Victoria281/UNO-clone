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
    receivedMessage,
    notifyFriends
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
import Cheering from "./userComponents/audio/clap.wav"
import { useSpeechSynthesis } from "react-speech-kit";
import EndGameModal from "./gameComponents/EndGameModal"
import CustomNotification from "../../OtherComponents/NotificationComponent/Notifications";
import FriendsNotification from "../../OtherComponents/NotificationComponent/FriendsNotifications";
import { useHistory } from "react-router-dom"

import { useRef } from "react";

//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [o_Notif, o_setNotif] = useState({ open: false, type: "", message: "" });
    const [otherPlayers, setOtherPlayers] = useState([])
    const [startCheer, setStartCheer] = useState(false)
    const [talk, setTalk] = useState(false)
    const [talkMessage, setTalkMessage] = useState("")
    const room_state = useSelector(state => state.multiplayer_rooms)
    const game_state = useSelector(state => state.multiplayer_rooms.game_state)
    const [endGameModalOpen, setEndGameModalOpen] = useState(false);

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
        if (game_state.end === true) {
            setEndGameModalOpen(true)
        }
    }, [game_state]);

    useEffect(() => {
        console.log("Joining the room")
        dispatch(joinRoom(roomcode, username, socket))
        if (localStorage.getItem("userid") !== undefined) {
            dispatch(notifyFriends(roomcode, username, socket))
        }
    }, []);

    useEffect(() => {
        console.log("talk is changed")
        console.log(talk)
        if (talk !== false) {
            console.log("Im talkinggg")
            speak({ text: talk })
            setTalk(false)
        }
    }, [talk]);

    const handlePlay = () => {
        var audio = new Audio(Cheering)
        audio.play()
    }

    let history = useHistory();
    const messagesEndRef = useRef(null);

    const scrollToBottom = (messagesEndRef) => {
        if (messagesEndRef && messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(() => {
        socket.on("identity", (data) => {
            dispatch(updateOwnIdentity(data))
            setUsername(data.user.username)
        });
        socket.on("chat", (data) => {
            console.log("received message update")
            console.log(data)
            dispatch(receivedMessage(data)).then(()=>{
                scrollToBottom(messagesEndRef)
            })
        });

        socket.on("roomUpdate", (data) => {
            console.log("ROOM got updated")
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
            o_setNotif({ open: true, type: 'error', message: data.message })
            setTimeout(() => {
                history.push("../createroom")
            }, 500);

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
            <EndGameModal
                endGameModalOpen={endGameModalOpen}
                setEndGameModalOpen={setEndGameModalOpen}
            />

            <CustomNotification uopen={o_Notif} usetOpen={o_setNotif} />
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
                    messagesEndRef={messagesEndRef}
                />
            }
        </>
    );
}
export default GameRoom;
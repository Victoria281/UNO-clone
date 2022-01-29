// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Player from "../gameComponents/Player"
import OtherPlayer from "../gameComponents/OtherPlayers"
import Deck from "../gameComponents/Deck"
import {
    Stack,
    Button
} from '@mui/material';
import styles from "../styles.module.css"
//gets the data from the action object and reducers defined earlier
const AudienceOptions = ({ socket, roomcode }) => {

    const handleClick = (sound) => {
        switch (sound) {
            case "Love":
                socket.emit("startCheer", roomcode)
                break;
            case "Cheer":
                socket.emit("startAudio", roomcode)
                break;
            default:
                break;
        }
    }

    const handleVoiceMessage = (text) => {
        socket.emit("sendAudioCheer", {
            roomcode: roomcode,
            text: "HI I AM AISYAH HELLO TEST HERERE HERRERER"
        })
    }

    return (
        <div>

            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => { handleClick("Love") }}>Love</Button>
                <Button variant="outlined" onClick={() => { handleClick("Cheer") }}>Clap</Button>
                <Button variant="outlined" onClick={() => { handleVoiceMessage() }}>Send Voice Message</Button>
            </Stack>
            <div >
                <p>drop down with player selection</p>
            </div>
        </div>

    );
}
export default AudienceOptions;
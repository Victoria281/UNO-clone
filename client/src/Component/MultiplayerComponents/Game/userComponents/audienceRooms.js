// @ts-nocheck
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Player from "../gameComponents/Player"
import OtherPlayer from "../gameComponents/OtherPlayers"
import Deck from "../gameComponents/Deck"
import { Stack, Button, Modal, Box, Typography, TextField } from '@mui/material';
import styles from "./styles.module.css"

// Icon Imports
import MessageIcon from '@mui/icons-material/Message';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import FavoriteIcon from '@mui/icons-material/Favorite';

//gets the data from the action object and reducers defined earlier
const AudienceOptions = ({ socket, roomcode }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [myValue, setValue] = useState('')

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
            // text: "HI I AM AISYAH HELLO TEST HERERE HERRERER"
            text: myValue
        })
    }

    return (
        <div>
            <Typography variant="h5" sx={{ ml: 8, mt: 2, mb: 2 }}>
                Interact with the players!
            </Typography>

            <Stack spacing={2} direction="row">
                <Button startIcon={<FavoriteIcon />} className={styles.btnLove} onClick={() => { handleClick("Love") }}>Love</Button>
                <Button startIcon={<FavoriteIcon />} className={styles.btnCheer} onClick={() => { handleClick("Cheer") }}>Clap</Button>
                <Button startIcon={<RecordVoiceOverIcon />} className={styles.btnModal} onClick={handleOpen}>Speak</Button>

            </Stack>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.txtModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Send a voice message
                    </Typography>

                    <MessageIcon className={styles.smsIcon} />

                    <TextField
                        className={styles.message}
                        id="message"
                        label="Message"
                        variant="standard"
                        value={myValue}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <Button className={styles.btnVoice} onClick={() => { handleVoiceMessage() }}>
                        Send Voice Message
                    </Button>
                </Box>
            </Modal>
        </div>

    );
}
export default AudienceOptions;
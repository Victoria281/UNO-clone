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
const AudienceOptions = ({ socket }) => {
    const dispatch = useDispatch();
    return (
        <div>

            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => { }}>Love</Button>
                <Button variant="outlined" onClick={() => { }}>Clap</Button>
                <Button variant="outlined" onClick={() => { }}>Send Voice Message</Button>
            </Stack>
        </div>

    );
}
export default AudienceOptions;
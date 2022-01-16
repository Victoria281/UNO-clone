// @ts-nocheck
import { useState } from "react";
import {
    playCard,
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';
import Card from "./Card"
import styles from "../styles.module.css"

//gets the data from the action object and reducers defined earlier
const Bot = ({ playerDeck, placement }) => {
    const dispatch = useDispatch();
    return (
        <Stack direction="row" spacing={1} className={`${styles.OtherPlayerStack} ${styles['OtherPlayerStack' + placement]}`}>
            {playerDeck.map((card, i) =>
                <Card
                    card={card}
                    cardId={"p1" + card.id}
                    playable={card.playable}
                />
            )}
        </Stack>
    );
}
export default Bot;
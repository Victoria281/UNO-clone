// @ts-nocheck
import { useState } from "react";
import {
    playCard,
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';
import BotCard from "./BotCard"
import styles from "../styles.module.css"

//gets the data from the action object and reducers defined earlier
const Bot = ({ playerDeck, placement, number, pturn, isTurn }) => {
    return (
        <>
            {
                isTurn ?
                    <p className={`${styles['PlayerName' + placement]} ${styles.PlayersTurn}`}>Player {pturn}...</p>

                    :
                    <p className={`${styles['PlayerName' + placement]}`}>Player {pturn}</p>

            }
            <Stack direction="row" spacing={1} className={`${styles.OtherPlayerStack} ${styles['OtherPlayerStack' + placement]}`}>
                {playerDeck.map((card, i) =>
                    <BotCard
                        card={card}
                        identity={"bot" + number}
                        cardId={"p1" + card.id}
                        botPlay={card.botPlayCard}
                    />
                )}
            </Stack>

        </>
    );
}
export default Bot;
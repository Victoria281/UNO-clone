//@ts-nocheck
import React from 'react';
import { Stack } from '@mui/material';
import Card from "./Card"
import styles from "../styles.module.css"

//gets the data from the action object and reducers defined earlier
const OtherPlayer = ({ playerDeck, placement, number, pturn, isTurn }) => {
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
                    <Card
                    identity={"bot" + number}
                        card={card}
                        cardId={"p1" + card.id}
                    />
                )}
            </Stack>

        </>
    );
}
export default OtherPlayer;
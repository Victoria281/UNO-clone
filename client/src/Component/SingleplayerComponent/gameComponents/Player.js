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
const Player = ({ playerDeck, current }) => {
    const dispatch = useDispatch();
    console.log(playerDeck)
    return (
        <div className={styles.PlayerArea}>
            <Stack direction="row" spacing={1} className={styles.PlayerStack}>
                {playerDeck.map((card, i) =>
                    <Card
                        card={card}
                        cardId={"p1" + card.id}
                        playable={card.playable}
                        identity={"player"}
                    />
                )}
                <div >
                    <div className={`${styles.CurrentColor} ${styles[current.color]}`}> </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                        <button className="roomBtn" onClick={() => { console.log("herer"); dispatch(callUNO()) }}><p>UNO</p></button>
                    </div>
                </div>
            </Stack>
        </div>
    );
}
export default Player;
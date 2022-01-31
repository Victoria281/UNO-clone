//@ts-nocheck
import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { Stack, Button } from '@mui/material';
import Card from "./Card"
import styles from "../styles.module.css"
import {
    callUNO,
    sortCards
} from "../../../../store/action/multiplayer/game"
//gets the data from the action object and reducers defined earlier
const Player = ({ playerDeck, current, playerTurn, isTurn, socket }) => {
    const dispatch = useDispatch();
    const game_state = useSelector(state => state.multiplayer_rooms.game_state)
    const room_state = useSelector(state => state.multiplayer_rooms)

    return (
        <>
            {
                isTurn ?
                    <>
                        <p className={`${styles.PlayerName} ${styles.PlayersTurn}`}>Player {playerTurn} Loading...</p>
                    </>
                    :
                    <p className={styles.PlayerName}>Player {playerTurn}</p>
            }
            <div className={styles.PlayerArea}>
                <Stack direction="row" spacing={1} className={styles.PlayerStack}>
                    {playerDeck.map((card, i) =>
                        <Card
                            card={card}
                            cardId={"p1" + card.id}
                            playable={card.playable}
                            identity={"player"}
                            socket={socket}
                        />
                    )}
                    <div >
                        <div className={`${styles.CurrentColor} ${styles[current.color]}`}> </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                            <button className="roomBtn" onClick={() => {
                                if (game_state.unoPressed.player === room_state.myTurnIs) {
                                    dispatch(callUNO(socket))
                                }
                            }}><p>UNO</p></button>
                        </div>
                    </div>
                </Stack>

                <Stack spacing={2} direction="row">
                    <Button variant="outlined" onClick={()=>{dispatch(sortCards("color"))}}>Sort By Color</Button>
                    <Button variant="outlined" onClick={()=>{dispatch(sortCards("number"))}}>Sort By Number</Button>
                </Stack>
            </div>
        </>
    );
}
export default Player;
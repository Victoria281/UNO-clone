// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Player from "../gameComponents/Player"
import OtherPlayer from "../gameComponents/OtherPlayers"
import Deck from "../gameComponents/Deck"
import {
    Box,
    Grid
} from '@mui/material';
import styles from "../styles.module.css"
//gets the data from the action object and reducers defined earlier
const GameRoom = ({ otherPlayers, socket }) => {
    const dispatch = useDispatch();
    const game_state = useSelector(state => state.multiplayer_rooms.game_state)
    const room_state = useSelector(state => state.multiplayer_rooms)

    return (
        <Box>
            <Grid container
                style={{ border: "1px solid grey", height: "25vh" }}>
                <Grid item xs={6}
                    style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>

                    {(otherPlayers[1] !== undefined) &&
                        <OtherPlayer
                            placement={'Top'}
                            number={2}
                            playerDeck={game_state.playerdeck["player" + otherPlayers[1]]}
                            pturn={otherPlayers[1]}
                            isTurn={otherPlayers[1] === game_state.turn}
                            socket={socket} />
                            
                    }
                </Grid>
            </Grid>
            <Grid container
                style={{ border: "1px solid grey", height: "40vh" }}>
                <Grid item xs={3}
                    style={{ border: "1px solid grey" }}>
                    {(otherPlayers[0] !== undefined) &&
                        <OtherPlayer
                            placement={'Left'}
                            number={1}
                            playerDeck={game_state.playerdeck["player" + otherPlayers[0]]}
                            pturn={otherPlayers[0]}
                            isTurn={otherPlayers[0] === game_state.turn}
                            socket={socket} />
                    }
                </Grid>
                <Grid item xs={6}
                    style={{
                        border: "1px solid grey", display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                    {<Deck
                        current={game_state.current}
                        playing={game_state.turn === game_state.myTurnIs}
                        mainDeck={game_state.mainDeck}
                        used={game_state.used}
                        socket={socket} />}
                </Grid>
                <Grid item xs={3}
                    style={{ border: "1px solid grey" }}>
                    {(otherPlayers[2] !== undefined) &&
                        <OtherPlayer
                            placement={'Right'}
                            number={3}
                            playerDeck={game_state.playerdeck["player" + otherPlayers[2]]}
                            pturn={otherPlayers[2]}
                            isTurn={otherPlayers[2] === game_state.turn}
                            socket={socket} />
                    }
                </Grid>
            </Grid>
            <Grid container
                style={{ border: "1px solid grey", height: "25vh" }}>
                <Grid item xs={2}>
                    <img className={styles.ProfileIcon} src={"./images/uno-reverse.png"} />
                </Grid>
                <Grid item xs={6}
                    style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <Player
                        playerDeck={game_state.playerdeck["player"+game_state.myTurnIs]}
                        current={game_state.current}
                        playerTurn={game_state.myTurnIs}
                        isTurn={game_state.myTurnIs === game_state.turn}
                        socket={socket}
                    />
                </Grid>
                <Grid item xs={2}>
                    {
                        game_state.reverse === 0 ?
                            <img className={`${styles.ReverseIcon}`} src={"./images/uno-reverse.png"} />
                            :
                            <img className={`${styles.ReverseIcon}  ${styles.Reversed}`} src={"./images/uno-reverse.png"} />
                    }

                </Grid>
            </Grid>
        </Box>
    );
}
export default GameRoom;
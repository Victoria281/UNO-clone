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
import {
    checkCard
} from "../../../../store/action/multiplayer/game"
import styles from "../styles.module.css"
//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket }) => {
    const dispatch = useDispatch();

    const { game_state, room_state, otherPlayers } = useSelector(state => {

        const game_state = state.multiplayer_rooms.game_state
        const room_state = state.multiplayer_rooms
        console.log("who am i")
        console.log(room_state.myTurnIs)
        var otherPlayers;
        if (room_state.myTurnIs != -1) {
            const indexOfPlayer = game_state.order.findIndex((i) => i === room_state.myTurnIs)
            otherPlayers = game_state.order.slice(indexOfPlayer + 1).concat(game_state.order.slice(0, indexOfPlayer))
        } else {
            console.log("sending back order")
            otherPlayers = game_state.order
        }
        console.log("whats other players")
        console.log(otherPlayers)
        return { game_state, room_state, otherPlayers }
    })

    console.log("ROOM START")
    console.log(room_state)
    console.log(otherPlayers)

    useEffect(() => {
        console.log("Whose turn is it now?")
        console.log(game_state.turn)
        console.log(game_state)

        if (game_state.unoPressed.player !== false) {
            if (game_state.unoPressed.player === room_state.myTurnIs) {
                console.log("Times start")
                setTimeout(() => {
                    console.log("Times up")
                    console.log(socket)
                    dispatch(checkCard(socket))
                }, 2000);
            }
        } else if (game_state.turn == null) {
            // console.log("Its the bots turn now")
            console.log("Turn is null")
            console.log(game_state.pauseTurn)
        }
    }, [game_state]);
    return (
        <Box>
            <Grid container
                style={{ height: "25vh" }}>
                <Grid item xs={6}
                    style={{ marginRight: "auto", marginLeft: "auto" }}>

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
                style={{ height: "40vh" }}>
                <Grid item xs={3}>
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
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                    {<Deck
                        current={game_state.current}
                        playing={game_state.turn === room_state.myTurnIs}
                        mainDeck={game_state.mainDeck}
                        used={game_state.used}
                        socket={socket} />}
                </Grid>
                <Grid item xs={3}>
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
            {
                room_state.myTurnIs === -1 ?
                    (otherPlayers[3] !== undefined) &&
                    <OtherPlayer
                        placement={'Bottom'}
                        number={4}
                        playerDeck={game_state.playerdeck["player" + otherPlayers[3]]}
                        pturn={otherPlayers[3]}
                        isTurn={otherPlayers[3] === game_state.turn}
                        socket={socket} />
                    :
                    <Grid container
                        style={{ height: "25vh" }}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={6}
                            style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <Player
                                playerDeck={game_state.playerdeck["player" + room_state.myTurnIs]}
                                current={game_state.current}
                                playerTurn={room_state.myTurnIs}
                                isTurn={room_state.myTurnIs === game_state.turn}
                                socket={socket}
                            />
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                    </Grid>


            }
        </Box>
    );
}
export default GameRoom;
// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    Box,
    Grid,
    Stack
} from '@mui/material';
// import Player from "./gameComponents/Player"
import Deck from "./gameComponents/Deck"
import Card from "./gameComponents/Card"
import Player from "./gameComponents/Player"
import Bot from "./gameComponents/Bot"
import {
    prepareGameMaterials,
    botTurn,
    checkCard
} from "../../store/action/singleplayer/game"
import styles from "./styles.module.css";
import EndGameModal from "./gameComponents/EndGameModal"

const GameRoom = () => {
    const dispatch = useDispatch();
    const [otherPlayers, setOtherPlayers] = useState([])
    const game_state = useSelector(state => state.singleplayer_game)
    const [endGameModalOpen, setEndGameModalOpen] = useState(false);
    useEffect(() => {
        console.log("hrerere")
        dispatch(prepareGameMaterials())
            .then((result) => {
                console.log("Time to Start UNO")
                // console.log(result)
                setOtherPlayers(result);
            })
    }, []);

    useEffect(() => {
        console.log("Whose turn is it now?")
        console.log(game_state.turn)
        console.log(game_state)

        if (game_state.end === true) {
            setEndGameModalOpen(true)
        } else {
            if (game_state.unoPressed.player !== false) {
                console.log("Times start")
                setTimeout(() => {
                    console.log("Times up")
                    dispatch(checkCard())
                }, 2000);
            } else if (game_state.turn !== 0 &&
                game_state.mainDeck.length !== 0 &&
                !game_state.botPlayingCard &&
                !game_state.toDrawCard &&
                game_state.getDrawnCard == false &&
                game_state.unoPenalty == null
            ) {
                // console.log("Its the bots turn now")
                console.log("PlayerBot " + game_state.turn + " now")
                dispatch(botTurn())
            }
        }

    }, [game_state]);

    return (
        <>
            <EndGameModal
                endGameModalOpen={endGameModalOpen}
                setEndGameModalOpen={setEndGameModalOpen}
            />
            {(game_state.mainDeck.length === 0 || otherPlayers.length === 0) ?
                <p>Loading</p>
                :
                <Box style={{ marginTop: "5vh" }}>
                    <Grid container>
                        <Grid item xs={6}
                            style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <Bot
                                placement={'Top'}
                                number={2}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[1]]}
                                pturn={otherPlayers[1]}
                                isTurn={otherPlayers[1] === game_state.turn}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        style={{ height: "50vh" }}>
                        <Grid item xs={3}
                            style={{
                                marginTop: "auto",
                                marginBottom: "auto"
                            }}>
                            <Bot
                                number={1}
                                placement={'Left'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[0]]}
                                pturn={otherPlayers[0]}
                                isTurn={otherPlayers[0] === game_state.turn}
                            />
                        </Grid>
                        <Grid item xs={6}
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}>
                            <Deck
                            />
                        </Grid>
                        <Grid item xs={3}
                            style={{
                                marginTop: "auto",
                                marginBottom: "auto"
                            }}>
                            <Bot
                                number={3}
                                placement={'Right'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[2]]}
                                pturn={otherPlayers[2]}
                                isTurn={otherPlayers[2] === game_state.turn}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        style={{ height: "25vh" }}>
                        <Grid item xs={2}>
                            <img className={styles.ProfileIcon} src={"./images/uno-reverse.png"} />
                        </Grid>
                        <Grid item xs={6}
                            style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <Player
                                playerDeck={game_state.playerdeck["player0"]}
                                current={game_state.current}
                                playerTurn={game_state.playerTurn}
                                isTurn={game_state.playerTurn === game_state.turn}
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
            }

        </>
    );
}
export default GameRoom;
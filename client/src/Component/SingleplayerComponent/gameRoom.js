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
} from "../../store/action/singleplayer/game"

const GameRoom = () => {
    const dispatch = useDispatch();
    const [otherPlayers, setOtherPlayers] = useState([])
    const game_state = useSelector(state => state.singleplayer_game)
    const test = [
        { card: "Blue_0.png", id: 1 },
        { card: "Blue_1.png", id: 2 },
        { card: "Blue_2.png", id: 3 },
        { card: "Blue_3.png", id: 4 },
        { card: "Blue_4.png", id: 5 },
        { card: "Blue_5.png", id: 6 },
    ]
    useEffect(() => {
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

        if (game_state.turn !== 0 && game_state.mainDeck.length !== 0 && !game_state.botPlayingCard && !game_state.toDrawCard) {
            // console.log("Its the bots turn now")
            console.log("PlayerBot " + game_state.turn + " now")
            dispatch(botTurn())
        }
    }, [game_state]);

    return (
        <>
            {(game_state.mainDeck.length === 0 || otherPlayers.length === 0) ?
                <p>Loading</p>
                :
                <Box>
                    <Grid container
                        style={{ border: "1px solid grey", height: "25vh" }}>
                        <Grid item xs={6}
                            style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>
                            <Bot
                                placement={'Top'}
                                number={2}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[1]]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        style={{ border: "1px solid grey", height: "50vh" }}>
                        <Grid item xs={3}
                            style={{ border: "1px solid grey" }}>
                            <Bot
                                number={1}
                                placement={'Left'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[0]]}
                            />
                        </Grid>
                        <Grid item xs={6}
                            style={{
                                border: "1px solid grey", display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}>
                            <Deck current={game_state.current} used={game_state.used} />
                        </Grid>
                        <Grid item xs={3}
                            style={{ border: "1px solid grey" }}>
                            <Bot
                                number={3}
                                placement={'Right'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[2]]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        style={{ border: "1px solid grey", height: "25vh" }}>
                        <Grid item xs={6}
                            style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>
                            <Player
                                playerDeck={game_state.playerdeck["player0"]}
                                current={game_state.current}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }

            {/* <Stack direction="row" spacing={1}>
                {test.map((card, i) =>
                    <Card
                        image={card.card}
                        cardId={"p1" + card.id}
                    />
                )}
            </Stack> */}
        </>
    );
}
export default GameRoom;
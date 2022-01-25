// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { joinRoom } from "../../store/action/multiplayer/rooms"
import {
    updatePlayerList,
    prepareGameMaterials,
    startGameDetected,
    updateGameDetected,
} from "../../store/action/multiplayer/game"
import Player from "./gameComponents/Player"
import OtherPlayer from "./gameComponents/OtherPlayers"
import Deck from "./gameComponents/Deck"
import {
    Box,
    Grid
} from '@mui/material';
import SelectColorModal from "./gameComponents/SelectColorModal"

//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [gameStarted, setGameStarted] = useState(false)
    const [otherPlayers, setOtherPlayers] = useState([])
    const [selectColorModalOpen, setSelectColorModalOpen] = useState(false);
    const [cardChosen, setCardChosen] = useState({});
    const owner = useSelector(state => state.multiplayer_rooms.owner)
    const game_state = useSelector(state => state.multiplayer_game)
    const room_state = useSelector(state => state.multiplayer_rooms)

    // console.log(game_state)
    // console.log(room_state)
    const startGamePressed = () => {
        if (game_state.player_list.length > 1) {
            dispatch(prepareGameMaterials(socket))
        }
    }

    const handleWildCard = (card) => {
        setCardChosen(card)
        setSelectColorModalOpen(true)
    }

    useEffect(() => {
        if (owner == null) {
            if (localStorage.getItem("username") == undefined) {
                dispatch(joinRoom(socket, roomcode, localStorage.getItem("username")))
            } else {
                dispatch(joinRoom(socket, roomcode))
            }
        }

    }, [dispatch]);

    useEffect(() => {

        socket.on("startGame", (data) => {
            dispatch(startGameDetected(data))
                .then((result) => {
                    console.log(result)
                    setGameStarted(true);
                    console.log(result[1])
                    setOtherPlayers(result);
                })
        });

        socket.on("updateGame", (data) => {
            dispatch(updateGameDetected(data))
        });

    }, [socket]);

    useEffect(() => {
        socket.on("newuser", (data) => {
            dispatch(updatePlayerList(data.user, socket.id))
        })
    }, [socket]);

    return (

        <>
            <SelectColorModal
                selectColorModalOpen={selectColorModalOpen}
                setSelectColorModalOpen={setSelectColorModalOpen}
                socket={socket}
                card={cardChosen}
            />
            <Box>
                <Grid container
                    style={{ border: "1px solid grey", height: "25vh" }}>
                    <Grid item xs={6}
                        style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>
                        {(gameStarted && otherPlayers[1] !== undefined) &&
                            <OtherPlayer
                                placement={'Top'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[1]]}
                                playing={game_state.turn === otherPlayers[1]}
                                socket={socket} />
                        }
                    </Grid>
                </Grid>
                <Grid container
                    style={{ border: "1px solid grey", height: "40vh" }}>
                    <Grid item xs={3}
                        style={{ border: "1px solid grey" }}>
                        {(gameStarted && otherPlayers[0] !== undefined) &&
                            <OtherPlayer
                                placement={'Left'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[0]]}
                                playing={game_state.turn === otherPlayers[0]}
                                socket={socket} />
                        }
                    </Grid>
                    <Grid item xs={6}
                        style={{
                            border: "1px solid grey", display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}>
                        {gameStarted && <Deck
                            current={game_state.current}
                            playing={game_state.turn === game_state.myTurnIs}
                            mainDeck={game_state.mainDeck}
                            used={game_state.used}
                            socket={socket} />}
                    </Grid>
                    <Grid item xs={3}
                        style={{ border: "1px solid grey" }}>
                        {(gameStarted && otherPlayers[2] !== undefined) &&
                            <OtherPlayer
                                placement={'Right'}
                                playerDeck={game_state.playerdeck["player" + otherPlayers[2]]}
                                playing={game_state.turn === otherPlayers[2]}
                                socket={socket} />
                        }
                    </Grid>
                </Grid>
                <Grid container
                    style={{ border: "1px solid grey", height: "25vh" }}>
                    <Grid item xs={6}
                        style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>
                        {!gameStarted ?
                            <button className="roomBtn" onClick={() => { startGamePressed() }}><p>Start Game</p></button>
                            :
                            <div>
                                <p>turn {game_state.turn}</p>
                                <p>mine is {game_state.myTurnIs}</p>
                                <Player
                                    handleWildCard={handleWildCard}
                                    playerDeck={game_state.playerdeck["player" + game_state.myTurnIs]}
                                    playing={game_state.turn === game_state.myTurnIs}
                                    socket={socket} />
                            </div>
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default GameRoom;
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
import Player from "./playerComponents/player"
import OtherPlayer from "./playerComponents/otherPlayers"
import Deck from "./playerComponents/deck"
import {
    Box,
    Grid
} from '@mui/material';

//gets the data from the action object and reducers defined earlier
const GameRoom = ({ socket, roomcode }) => {
    const dispatch = useDispatch();
    const [gameStarted, setGameStarted] = useState(false)
    const [otherPlayers, setOtherPlayers] = useState([])
    const owner = useSelector(state => state.multiplayer_rooms.owner)
    const game_state = useSelector(state => state.multiplayer_game)
    const room_state = useSelector(state => state.multiplayer_rooms)

    console.log(game_state)
    console.log(room_state)
    const startGamePressed = () => {
        if (game_state.player_list.length > 1) {
            dispatch(prepareGameMaterials(socket))
        }
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

        <Box>
            <Grid container
                style={{ border: "1px solid grey", height: "25vh" }}>
                <Grid item xs={6}
                    style={{ border: "1px solid grey", marginRight: "auto", marginLeft: "auto" }}>
                    {(gameStarted && otherPlayers[1] !== undefined) &&
                        <OtherPlayer placement={'Top'} playerDeck={game_state.playerdeck["player" + otherPlayers[1]]} socket={socket} />
                    }
                </Grid>
            </Grid>
            <Grid container
                style={{ border: "1px solid grey", height: "40vh" }}>
                <Grid item xs={3}
                    style={{ border: "1px solid grey" }}>
                    {(gameStarted && otherPlayers[0] !== undefined) &&
                        <OtherPlayer placement={'Left'} playerDeck={game_state.playerdeck["player" + otherPlayers[0]]} socket={socket} />
                    }
                </Grid>
                <Grid item xs={6}
                    style={{ border: "1px solid grey" }}>
                    {gameStarted && <Deck current={game_state.current} mainDeck={game_state.mainDeck} used={game_state.used} />}
                </Grid>
                <Grid item xs={3}
                    style={{ border: "1px solid grey" }}>
                    {(gameStarted && otherPlayers[2] !== undefined) &&
                        <OtherPlayer placement={'Right'} playerDeck={game_state.playerdeck["player" + otherPlayers[2]]} socket={socket} />
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
                            <Player playerDeck={game_state.playerdeck["player" + game_state.myTurnIs]} socket={socket} />
                        </div>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}
export default GameRoom;
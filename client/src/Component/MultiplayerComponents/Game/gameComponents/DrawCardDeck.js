// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
    sendPlayerAction,
    startPlayerAction,
    // playerToDrawCard,
    unoPenalty
} from "../../../../store/action/multiplayer/game"
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from "react-transition-group";
import styles from "./styles.module.css"
import { Stack } from '@mui/material';

//gets the data from the action object and reducers defined earlier
const DrawCardDeck = ({ socket }) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [inAProp, setInAProp] = useState(true);
    const game_state = useSelector(state => state.multiplayer_rooms.game_state)
    const room_state = useSelector(state => state.multiplayer_rooms)
    const [travelFromDrawDeck, setTravelFromDrawDeck] = useState({
        x: 0,
        y: 0
    });

    const timeout = 800;


    useEffect(() => {
        console.log(game_state.toDrawCard)
        if (game_state.toDrawCard.player !== false) {
            console.log("im drawing card for bot")
            console.log(game_state.toDrawCard)
            const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
            const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.toDrawCard.player].slice(-1)[0].id}`).getBoundingClientRect();

            setTravelFromDrawDeck({
                x: lastPlayerCard.x - drawDeckDOM.x,
                y: lastPlayerCard.y - drawDeckDOM.y
            })

            setInAProp(false);
            setTimeout(() => {
                if (game_state.toDrawCard.player === room_state.myTurnIs) {
                    dispatch(startPlayerAction("draw", socket))
                }
                setInAProp(true);
                // dispatch(drawCard());
            }, timeout);
        }
        if (game_state.unoPenalty !== false) {
            console.log("imk applying penalty for UNO")
            console.log(game_state.unoPenalty)
            console.log(game_state.playerdeck["player" + game_state.unoPenalty])
            console.log(game_state.playerdeck["player" + game_state.unoPenalty].slice(-1)[0])
            console.log(game_state.playerdeck["player" + game_state.unoPenalty].slice(-1)[0].id)
            const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
            const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.unoPenalty].slice(-1)[0].id}`).getBoundingClientRect();

            setTravelFromDrawDeck({
                x: lastPlayerCard.x - drawDeckDOM.x,
                y: lastPlayerCard.y - drawDeckDOM.y
            })

            setInAProp(false);
            setTimeout(() => {
                if (game_state.unoPenalty === room_state.myTurnIs) {
                    dispatch(unoPenalty(socket))
                }
                setInAProp(true);
                // dispatch(drawCard());
            }, timeout);
        }


    }, [game_state]);

    const handleClick = () => {
        console.log("drawingcard")
        dispatch(sendPlayerAction("draw", socket))

    }

    const defaultStyle = {
    };

    const transitionStyles = {
        entering: {
            opacity: 1
        },
        entered: {
            opacity: 0
        },
        exiting: {
            opacity: 1,
            // transform: `translate(${89}px, ${-300}px) rotate(${90}deg)`
        },
        exited: {
            opacity: 1,
            transform: `scale(0.78) translate(${travelFromDrawDeck.x}px, ${travelFromDrawDeck.y}px) rotate(${90}deg)`,
            transition: `transform ${timeout}ms`,
            transitionTimingFunction: "linear"
        }
    };

    return (
        <Transition nodeRef={nodeRef} in={inAProp} timeout={timeout}>
            {(state) => {
                return (
                    <div
                        id={`drawCardDeck`}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        className={styles.TopDrawCard}
                        onClick={() => {
                            if (room_state.myTurnIs === game_state.turn) {
                                handleClick();
                            }
                        }}
                    >
                        {(game_state.toDrawCard.player !== false && game_state.toDrawCard.number !== 1) ?
                            (game_state.toDrawCard.number === 2 || game_state.unoPenalty !== false) ?
                                <img
                                    className="img-responsive"
                                    style={{ width: 90 }}
                                    src={
                                        process.env.REACT_APP_API_URL + "/api/uno/images/Blue_2.png"
                                    }
                                />
                                :
                                <img
                                    className="img-responsive"
                                    style={{ width: 90 }}
                                    src={
                                        process.env.REACT_APP_API_URL + "/api/uno/images/Blue_4.png"
                                    }
                                />
                            :
                            <img
                                className="img-responsive"
                                style={{ width: 90 }}
                                src={
                                    process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                                }
                            />
                        }
                    </div>
                );
            }}
        </Transition>


    );
}
export default DrawCardDeck;
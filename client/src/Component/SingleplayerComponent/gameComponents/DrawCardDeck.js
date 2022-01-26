// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
    drawCard,
    playerToDrawCard,
    unoPenalty
} from "../../../store/action/singleplayer/game"
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from "react-transition-group";
import styles from "./styles.module.css"
import { Stack } from '@mui/material';

//gets the data from the action object and reducers defined earlier
const DrawCardDeck = ({ }) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [inAProp, setInAProp] = useState(true);
    const game_state = useSelector(state => state.singleplayer_game)
    const [travelFromDrawDeck, setTravelFromDrawDeck] = useState({
        x: 0,
        y: 0
    });

    const timeout = 800;


    useEffect(() => {
        if (game_state.toDrawCard) {
            // console.log("im drawing card for bot")
            const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
            const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.turn].slice(-1)[0].id}`).getBoundingClientRect();

            setTravelFromDrawDeck({
                x: lastPlayerCard.x - drawDeckDOM.x,
                y: lastPlayerCard.y - drawDeckDOM.y
            })

            setInAProp(false);
            setTimeout(() => {
                // console.log("here drawing for bot")
                setInAProp(true);
                dispatch(drawCard());
            }, timeout);

        } else if (game_state.getDrawnCard !== false) {
            const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
            const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.getDrawnCard.player].slice(-1)[0].id}`).getBoundingClientRect();

            setTravelFromDrawDeck({
                x: lastPlayerCard.x - drawDeckDOM.x,
                y: lastPlayerCard.y - drawDeckDOM.y
            })


            setInAProp(false);
            setTimeout(() => {
                // console.log("here drawing for bot")
                setInAProp(true);
                dispatch(playerToDrawCard());
            }, timeout);
        } else if (game_state.unoPenalty !== null) {
            const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
            const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.unoPenalty].slice(-1)[0].id}`).getBoundingClientRect();

            setTravelFromDrawDeck({
                x: lastPlayerCard.x - drawDeckDOM.x,
                y: lastPlayerCard.y - drawDeckDOM.y
            })


            setInAProp(false);
            setTimeout(() => {
                // console.log("here drawing for bot")
                setInAProp(true);
                dispatch(unoPenalty());
            }, timeout);
        }

    }, [game_state]);

    const handleClick = () => {
        const drawDeckDOM = document.getElementById("drawCardDeck").getBoundingClientRect();
        const lastPlayerCard = document.getElementById(`p1${game_state.playerdeck["player" + game_state.turn].slice(-1)[0].id}`).getBoundingClientRect();

        switch (game_state.turn) {
            case 0: {
                setTravelFromDrawDeck({
                    x: lastPlayerCard.x - drawDeckDOM.x,
                    y: lastPlayerCard.y - drawDeckDOM.y
                })

                setInAProp(false);
                setTimeout(() => {
                    // console.log("here")
                    setInAProp(true);
                    dispatch(drawCard());
                }, timeout);

                break;
            }
            default:
                break;
        }

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
                            handleClick();
                        }}
                    >
                        {game_state.getDrawnCard !== false ?
                            game_state.getDrawnCard.num === 2 ?
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
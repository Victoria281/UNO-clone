// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
    sendPlayerAction,
    startPlayerAction
} from "../../../../store/action/multiplayer/game"
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from "react-transition-group";
import SelectColorModal from "./SelectColorModal"
import styles from "./styles.module.css"

//gets the data from the action object and reducers defined earlier
const Card = ({ card, cardId, identity, playable, socket }) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [inAProp, setInAProp] = useState(true);
    const [selectColorModalOpen, setSelectColorModalOpen] = useState(false);
    const game_state = useSelector(state => state.multiplayer_rooms.game_state)
    const room_state = useSelector(state => state.multiplayer_rooms)
    const [cardChosen, setCardChosen] = useState({});
    const [travelFromDeck, setTravelFromDeck] = useState({
        x: 0,
        y: 0
    });

    const timeout = 800;

    useEffect(() => {
        if (game_state.otherPlayerPlayingCard.player !== false) {
            if (game_state.otherPlayerPlayingCard.card.id === card.id) {
                console.log(game_state.otherPlayerPlayingCard)
                const mainDeckDOM = document.getElementById("mainDeck").getBoundingClientRect();
                const selectedCardDOM = document.getElementById(`p1${game_state.otherPlayerPlayingCard.card.id}`).getBoundingClientRect();

                switch (identity) {
                    case "bot1": {
                        setTravelFromDeck({
                            y: -(mainDeckDOM.x - selectedCardDOM.x),
                            x: mainDeckDOM.y - selectedCardDOM.y
                        })
                        break;
                    }
                    case "bot2": {
                        setTravelFromDeck({
                            x: selectedCardDOM.x - mainDeckDOM.x,
                            y: -(mainDeckDOM.y - selectedCardDOM.y)
                        })
                        break;
                    }
                    case "bot3": {
                        setTravelFromDeck({
                            y: mainDeckDOM.x - selectedCardDOM.x,
                            x: -(mainDeckDOM.y - selectedCardDOM.y)
                        })
                        break;
                    }
                    default:
                        setTravelFromDeck({
                            x: mainDeckDOM.x - selectedCardDOM.x,
                            y: mainDeckDOM.y - selectedCardDOM.y
                        })
                        break;
                }
                setInAProp(false);
                setTimeout(() => {
                    if (game_state.otherPlayerPlayingCard.player === room_state.myTurnIs) {
                        dispatch(startPlayerAction("play", socket))
                    }
                    setInAProp(true);
                }, timeout);




            }

        }

    }, [game_state]);


    const handleClick = (card) => {

        if (card.color === "wild") {
            setCardChosen(card)
            setSelectColorModalOpen(true)
        } else {
            dispatch(sendPlayerAction("play", socket, { card: card }))
        }



    }

    const defaultStyle = {

    };

    const transitionStyles = {
        entering: {
            opacity: 1
        },
        entered: {
            opacity: 1
        },
        exiting: {
            opacity: 1,
            // transform: `translate(${89}px, ${-300}px) rotate(${90}deg)`
        },
        exited: {
            opacity: 1,
            transform: `scale(1.28) translate(${travelFromDeck.x / 1.28}px, ${travelFromDeck.y / 1.28}px) rotate(${90}deg)`,
            transition: `transform ${timeout}ms`,
            transitionTimingFunction: "linear"
        }
    };

    return (
        <>

            <SelectColorModal
                selectColorModalOpen={selectColorModalOpen}
                setSelectColorModalOpen={setSelectColorModalOpen}
                card={cardChosen}
                socket={socket}
            />
            <Transition nodeRef={nodeRef} in={inAProp} timeout={timeout}>
                {(state) => {
                    // // console.log(state);
                    return (
                        <div
                            id={`${cardId}`}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                            // className="p1cards"
                            onClick={() => {
                                // console.log("clicked");
                                // console.log("isplayable");
                                if (card.playable) {
                                    handleClick(card);
                                }
                            }}
                        >
                            {identity.includes("bot") === true ?
                                <img
                                    className="img-responsive"
                                    style={{ width: 50 }}
                                    src={
                                        process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                                    }
                                />
                                :

                                playable === undefined || playable === false ?
                                    <img
                                        className="img-responsive"
                                        style={{ width: 50 }}
                                        src={
                                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                            card.image_file.slice(8)
                                        }
                                    />
                                    :
                                    <img
                                        className={`img-responsive ${styles.Playable}`}
                                        style={{ width: 50 }}
                                        src={
                                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                            card.image_file.slice(8)
                                        }
                                    />
                            }

                        </div>
                    );
                }}
            </Transition>

        </>
    );
}
export default Card;
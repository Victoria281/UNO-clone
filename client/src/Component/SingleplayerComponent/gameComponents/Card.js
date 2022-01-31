// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
    playCard
} from "../../../store/action/singleplayer/game"
import { useDispatch } from 'react-redux'
import { Transition } from "react-transition-group";
import SelectColorModal from "./SelectColorModal"
import styles from "./styles.module.css"

//gets the data from the action object and reducers defined earlier
const Card = ({ card, cardId, identity, playable }) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [inAProp, setInAProp] = useState(true);
    const [selectColorModalOpen, setSelectColorModalOpen] = useState(false);
    const [cardChosen, setCardChosen] = useState({});    
    const [travelFromDeck, setTravelFromDeck] = useState({
        x: 0,
        y: 0
    });

    const timeout = 800;

    const handleClick = () => {
        const mainDeckDOM = document.getElementById("mainDeck").getBoundingClientRect();
        const selectedCardDOM = document.getElementById(`${cardId}`).getBoundingClientRect();

        switch (identity) {
            case "player": {
                setTravelFromDeck({
                    x: mainDeckDOM.x - selectedCardDOM.x,
                    y: mainDeckDOM.y - selectedCardDOM.y
                })
                setInAProp(false);
                setTimeout(() => {
                    // console.log("here")
                    setInAProp(true);
                    if (card.color === "wild"){
                        setCardChosen(card)
                        setSelectColorModalOpen(true)
                    } else {
                        dispatch(playCard(card));
                    }
                }, timeout);

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
                                    handleClick();
                                }
                            }}
                        >
                            {playable === undefined || playable === false ?
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
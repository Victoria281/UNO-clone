// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux'
import { Transition } from "react-transition-group";
import styles from "./styles.module.css"
import CheerIcon from "../../../../icons/profile.png"
import {
    getRandomInt,
} from "../../../../store/features/multiplayer/game"

//gets the data from the action object and reducers defined earlier
const AudienceIcon = ({
    startCheer,
    setStartCheer
}) => {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [inAProp, setInAProp] = useState(true);
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [travelFromDeck, setTravelFromDeck] = useState({
        x: 0,
        y: 0
    });
    const [travelFromDeck2, setTravelFromDeck2] = useState({
        x: 0,
        y: 0
    });

    const timeout = 3000;

    useEffect(() => {
        if (startCheer !== false) {
            setOne(getRandomInt(1, 6) * 10)
            setTwo(getRandomInt(4, 9) * 10)
            
            setTravelFromDeck({
                x: 0,
                y: -(getRandomInt(300, 700))
            })
            setTravelFromDeck2({
                x: 0,
                y: -(getRandomInt(300, 700))
            })

            setInAProp(false);
            setTimeout(() => {
                setStartCheer(false)
                setInAProp(true);
            }, timeout);

        }

    }, [startCheer]);


    const defaultStyle1 = {
        position: "absolute",
        bottom: "10px",
        left: `${one}vw`
    };
    const defaultStyle2 = {
        position: "absolute",
        bottom: "10px",
        left: `${two}vw`
    };

    const transitionStyles1 = {
        entering: {
            opacity: 1,
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
            transform: `translate(${travelFromDeck.x}px, ${travelFromDeck.y}px) rotate(${90}deg)`,
            transition: `transform ${timeout}ms`,
            transitionTimingFunction: "linear"
        }
    };

    const transitionStyles2 = {
        entering: {
            opacity: 1,
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
            transform: `translate(${travelFromDeck2.x}px, ${travelFromDeck2.y}px) rotate(${90}deg)`,
            transition: `transform ${timeout}ms`,
            transitionTimingFunction: "linear"
        }
    };

    return (
        <>
            <Transition nodeRef={nodeRef} in={inAProp} timeout={timeout}>
                {(state) => {
                    return (
                        <>
                        <div
                            id={`cheer`}
                            style={{
                                ...defaultStyle1,
                                ...transitionStyles1[state]
                            }}
                        >
                            <img
                                className={`img-responsive ${styles.Playable}`}
                                style={{ width: 70 }}
                                src={CheerIcon}
                            />
                        </div>
                        <div
                            style={{
                                ...defaultStyle2,
                                ...transitionStyles2[state]
                            }}
                        >
                            <img
                                className={`img-responsive ${styles.Playable}`}
                                style={{ width: 70 }}
                                src={CheerIcon}
                            />
                        </div>
                        </>
                    );
                }}
            </Transition>

        </>
    );
}
export default AudienceIcon;
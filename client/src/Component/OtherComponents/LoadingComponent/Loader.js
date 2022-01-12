



// @ts-ignore
import { Fragment, useState } from "react";
import "./loader.scss";

const Loader = () => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [selected, setSelected] = useState(0)
    const [cards,] = useState([
        "Blue_Skip",
        "Yellow_0",
        "Red_Reverse",
        "Blue_Skip",
        "Green_Draw",
        "Wild",
        "Wild_Draw",
        "Blue_3",
        "Red_6"
    ])

    const handleFlip = () => {
        if (!isFlipped) setSelected(Math.floor(Math.random() * cards.length))
        setIsFlipped(!isFlipped)
    }
    return (
        <>
            <div className="scene scene--card">
                <div className={isFlipped ? 'cards is-flipped' : 'cards'}>
                    <div
                        onClick={() => handleFlip()}
                        className="card__face card__face--front">
                        <img className="" src={process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"} />
                    </div>
                    <div
                        onClick={() => handleFlip()}
                        className="card__face card__face--back">
                        <img className="" src={process.env.REACT_APP_API_URL + `/api/uno/images/${cards[selected]}.png`} />
                    </div>
                </div>
                <p> Click Me ! </p>
            </div>

            <div>
                <img className="card" src={process.env.REACT_APP_API_URL + "/api/uno/images/Blue_Skip.png"} />
                <img className="card" src={process.env.REACT_APP_API_URL + "/api/uno/images/Red_Reverse.png"} />
                <img className="card" src={process.env.REACT_APP_API_URL + "/api/uno/images/Green_Draw.png"} />
                <img className="card" src={process.env.REACT_APP_API_URL + "/api/uno/images/Yellow_0.png"} />
                <img className="card" src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild_Draw.png"} />
                <h1>Loading</h1>

            </div>
        </>);
};

export default Loader;
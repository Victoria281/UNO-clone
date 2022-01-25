// @ts-nocheck
import { useState } from "react";
import {
    playCard,
} from "../../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';
import SelectColorModal from './SelectColorModal'

//gets the data from the action object and reducers defined earlier
const Player = ({ handleWildCard, playerDeck, playing, socket }) => {
    const dispatch = useDispatch();

    const handlePlayCard = () => {

    }
    return (
        <Stack direction="row" spacing={1}>
            {playerDeck.map((card, i) =>
                card.playable ?
                    <div
                        className="p1cards"
                        key={i}
                        onClick={() => handlePlayCard()}
                    >
                        <img
                            className="img-responsive isplayable"
                            style={{ width: 70 }}
                            src={
                                process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                card.image_file.slice(8)
                            }
                            alt={card.values + " " + card.color}
                        />
                    </div>
                    :
                    <div
                        className="p1cards"
                        key={i}
                        onClick={() => handlePlayCard()}>
                        <img
                            className="img-responsive"
                            style={{ width: 70 }}
                            src={
                                process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                card.image_file.slice(8)
                            }
                            alt={card.values + " " + card.color}
                        />
                    </div>


            )}
            {playing && <div>
                <p>Turn</p>
            </div>}
        </Stack >
    );
}
export default Player;
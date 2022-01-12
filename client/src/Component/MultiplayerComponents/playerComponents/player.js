// @ts-nocheck
import {
    playCard,
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import {Stack} from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Player = ({ playerDeck, socket }) => {
    const dispatch = useDispatch();
    return (
        <Stack direction="row" spacing={1}>
            {playerDeck.map((card, i) =>
                card.playable ?
                    <div
                        className="p1cards"
                        key={i}
                        onClick={() => {
                            dispatch(playCard(card, socket));
                        }}
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
                        key={i}>
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
        </Stack >
    );
}
export default Player;
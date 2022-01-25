// @ts-nocheck
import { Stack } from '@mui/material';
import styles from "../styles.module.css"

//gets the data from the action object and reducers defined earlier
const UnoCard = ({ playerDeck, placement }) => {
    return (
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
    );
}
export default UnoCard;
// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';
import styles from "./styles.module.css"
import DrawCardDeck from "./DrawCardDeck"
//gets the data from the action object and reducers defined earlier
const Deck = ({ current, used }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Stack direction="row" spacing={3} className={styles.mainDeckArea}>

                <div className={styles.CardPlayedDeck}>
                    <img
                        id="mainDeck"
                        className={`img-responsive ${styles.TopCard}`}
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            current.image_file.slice(8)
                        }
                        alt={current.values + " " + current.color}
                    />
                    {used.length !== 0 &&
                        <img
                            className={`img-responsive ${styles.BelowCard}`}
                            style={{ width: 90 }}
                            src={
                                process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                used[used.length - 1].image_file.slice(8)
                            }
                            alt={used[used.length - 1].values + " " + used[used.length - 1].color}
                        />
                    }
                </div>
                <div className={styles.DrawCardDeck}>

                    <DrawCardDeck />
                    <img
                        className={`img-responsive ${styles.BelowDrawCard}`}
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                        }
                    />
                </div>
            </Stack>
        </div>
    );
}
export default Deck;
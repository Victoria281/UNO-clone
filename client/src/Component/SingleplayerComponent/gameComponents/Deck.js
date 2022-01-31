// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../store/action/multiplayer/game"
import { useSelector } from 'react-redux'
import { Stack } from '@mui/material';
import styles from "./styles.module.css"
import DrawCardDeck from "./DrawCardDeck"
//gets the data from the action object and reducers defined earlier
const Deck = () => {
    const { game_state, mainDeckState } = useSelector(state => {
        const game_state = state.singleplayer_game;
        const mainDeckState = []
        for (var i = 0; i < Math.floor(state.singleplayer_game.mainDeck.length / 27); i++) {
                mainDeckState.push(1)
        }
        console.log(mainDeckState)
        return { game_state, mainDeckState }
    })
    return (
        <div>
            <Stack direction="row" spacing={3} className={styles.mainDeckArea}>

                <div className={styles.CardPlayedDeck}>
                    <img
                        id="mainDeck"
                        className={`img-responsive ${styles.TopCard}`}
                        style={{ width: 60 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            game_state.current.image_file.slice(8)
                        }
                        alt={game_state.current.values + " " + game_state.current.color}
                    />
                    {game_state.used.length !== 0 &&
                        <img
                            className={`img-responsive ${styles.BelowCard}`}
                            style={{ width: 60 }}
                            src={
                                process.env.REACT_APP_API_URL + "/api/uno/images/" +
                                game_state.used[game_state.used.length - 1].image_file.slice(8)
                            }
                            alt={game_state.used[game_state.used.length - 1].values + " " + game_state.used[game_state.used.length - 1].color}
                        />
                    }
                </div>
                <div className={styles.DrawCardDeck}>

                    <DrawCardDeck />

                    <div className={styles.TopDrawCard}>
                        {mainDeckState.map((d, i) => 
                            <img
                                className={`img-responsive ${styles.Deck}`}
                                style={{ width: 60 }}
                                src={
                                    process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                                }
                            />
                        )}
                    </div>
                </div>
            </Stack>
        </div>
    );
}
export default Deck;
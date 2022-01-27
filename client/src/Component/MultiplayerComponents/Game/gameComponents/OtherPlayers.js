import React from 'react';
import { Stack } from '@mui/material';
import styles from "../styles.module.css"

//gets the data from the action object and reducers defined earlier
const OtherPlayer = ({ playerDeck, playing, placement }) => {
    return (
        <Stack direction="row" spacing={1} className={`${styles.OtherPlayerStack} ${styles['OtherPlayerStack' + placement]}`}>
            {playerDeck.map((card, i) =>
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

            {playing && <div>
                <p>Turn</p>
            </div>}
        </Stack >
    );
}
export default OtherPlayer;
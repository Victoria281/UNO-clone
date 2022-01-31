// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material';
import styles from "../styles.module.css"


//gets the data from the action object and reducers defined earlier
const Friend = ({ data, requestFriend }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={styles.friendBox}>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={7}>
                    <p className={styles.friendUsername}>{data.username}</p>
                </Grid>
                <Grid item xs={5}>
                    {data.status ?
                        <button
                            className={`${styles.play} ${styles.friendBtn}`}
                            onClick={() => { requestFriend(data.username) }}>
                            {
                                data.requested === "rejected" ?
                                    <>Rejected</>
                                    :
                                    data.requested === false ?
                                        <>Play</>
                                        :
                                        <>Requested</>

                            }

                        </button> : <button className={styles.friendBtn}>Offline</button>}
                </Grid>
            </Grid>
        </div>
    );
}
export default Friend;
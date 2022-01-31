// @ts-nocheck
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { Grid, Stack } from '@mui/material';
import styles from "../styles.module.css"
import {
	acceptFriendRequestGame,
	rejectFriendRequestGame
} from "../../../../store/action/multiplayer/rooms"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

//gets the data from the action object and reducers defined earlier
const FriendRequest = ({ data, socket }) => {
    const dispatch = useDispatch();
	const [username,] = useState(localStorage.getItem("username"))

    const acceptFriend = (requestedUser) => {
        dispatch(acceptFriendRequestGame(username, socket, requestedUser))
    }

    const rejectFriend = (requestedUser) => {
        dispatch(rejectFriendRequestGame(username, socket, requestedUser))
    }

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
                    <Stack spacing={1} direction="row">
                        <button className={`${styles.play} ${styles.friendBtn}`} onClick={() => { acceptFriend(data) }}><DoneIcon/></button><br />
                        <button className={`${styles.play} ${styles.friendBtn}`} onClick={() => { rejectFriend(data) }}><CloseIcon/></button><br />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
export default FriendRequest;
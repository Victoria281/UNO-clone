// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Friend = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <p>{data.username}</p>
            {data.status ? <button>Play</button> : <p>Offline</p>}

        </Grid>
    );
}
export default Friend;
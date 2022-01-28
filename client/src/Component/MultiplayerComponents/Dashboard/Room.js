// @ts-nocheck
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Room = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <p>{data.roomname}</p>
            <button>Join</button>

        </Grid>
    );
}
export default Room;
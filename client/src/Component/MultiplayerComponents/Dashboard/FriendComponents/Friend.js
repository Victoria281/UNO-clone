// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Friend = ({ data, requestFriend }) => {
    const dispatch = useDispatch();
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <p>{data.username}</p>
            {data.status ? <button onClick={() => { requestFriend(data.username) }}>

                {
                    data.requested === "rejected" ?
                        <>Rejected</>
                        :
                        data.requested === false ?
                            <>Play</>
                            :
                            <>Requested</>

                }

            </button> : <p>Offline</p>}

        </Grid>
    );
}
export default Friend;
// @ts-nocheck
import {
    playCard,
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Deck = ({ current, used, socket }) => {
    const dispatch = useDispatch();
    return (
        <div>
            {used.length === 0 ?
                <Stack direction="row" spacing={3}>
                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            current.image_file.slice(8)
                        }
                        alt={current.values + " " + current.color}
                    />
                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                        }
                        alt={current.values + " " + current.color}
                    />
                </Stack>

                :
                <Stack direction="row" spacing={3}>

                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            current.image_file.slice(8)
                        }
                        alt={current.values + " " + current.color}
                    />
                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            current.image_file.slice(8)
                        }
                        alt={current.values + " " + current.color}
                    />
                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                        }
                        alt={current.values + " " + current.color}
                    />
                </Stack>
            }
        </div>
    );
}
export default Deck;
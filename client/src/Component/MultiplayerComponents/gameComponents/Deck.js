// @ts-nocheck
import {
    drawCard, callUNO
} from "../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/material';


//gets the data from the action object and reducers defined earlier
const Deck = ({ handleWildCard, current, used, socket, playing }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Stack direction="row" spacing={3}>
                {used.length === 0 ?

                    <img
                        className="img-responsive"
                        style={{ width: 90 }}
                        src={
                            process.env.REACT_APP_API_URL + "/api/uno/images/" +
                            current.image_file.slice(8)
                        }
                        alt={current.values + " " + current.color}
                    />
                    :
                    <div>
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
                                used[used.length - 1].image_file.slice(8)
                            }
                            alt={used[used.length - 1].values + " " + used[used.length - 1].color}
                        />
                    </div>
                }

                <img
                    className="img-responsive"
                    style={{ width: 90 }}
                    src={
                        process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"
                    }
                    onClick={() => { console.log("drawing"); if (playing) dispatch(drawCard(socket)).then((result)=>{
                        if (result.color === "wild"){ handleWildCard(result) }
                    }) }}
                    alt={current.values + " " + current.color}
                />
                <p>{current.color}</p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                    <button className="roomBtn" onClick={() => { console.log("herer"); dispatch(callUNO()) }}><p>UNO</p></button></div>
            </Stack>
        </div>
    );
}
export default Deck;
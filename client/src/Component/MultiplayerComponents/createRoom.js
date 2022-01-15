// @ts-nocheck
import React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/room.css"
import { useSelector, useDispatch } from 'react-redux'
import { createNewRoom } from "../../store/action/multiplayer/rooms"
import { useHistory } from "react-router-dom";

const CreateRoom = ({ socket }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const [roomname, setroomname] = useState("");
    const [username,] = useState(localStorage.getItem("username"))

    const create = () => {
        if (roomname !== "") {
            dispatch(createNewRoom(roomname, username, socket))
            .then(result => history.push(`/multiplayer/${result}`))
        } else {
            alert("Please enter room name!");
            window.location.reload();
        }
    }

    return (
        <div className="homepage">
            {/* <h1 className="name">MULTIPLAYER</h1> */}
            <div className="input-box">
                <input
                    className="roomInput"
                    placeholder="Room Name"
                    value={roomname}
                    onChange={(e) => { setroomname(e.target.value) }}
                ></input>
                <br />

                <button className="roomBtn" onClick={() => { create() }}><p>Create Room</p></button>

                <Link to={`/multiplayer/${roomname}`}>
                    <button className="roomBtn"><p>Join</p></button>
                </Link></div>

        </div>
    );
}

export default CreateRoom;
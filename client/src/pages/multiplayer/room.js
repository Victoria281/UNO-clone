// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/room.css"
import { useSelector, useDispatch } from 'react-redux'
import { createNewRoom } from "../../store/action/multiplayer/rooms"

function RoomPage({ socket }) {
  console.log(socket)
  const dispatch = useDispatch();

  const [roomname, setroomname] = useState("");
  const [username,] = useState(localStorage.getItem("username"))
  const roomCode = useSelector(state => state.roomCode)

  const createRoom = () => {
    if (roomname !== "") {
      const roomCode = dispatch(createNewRoom(roomname, username, socket))
      // socket.emit("joinRoom", { username, roomname });
    } else {
      alert("Please enter room name!");
      window.location.reload();
    }
  };

  const joinRoom = () => {
    if (username === "") {
      alert("Error Occured. You should login again")
    } else {
      if (roomname !== "") {
        const roomCode = dispatch(createNewRoom(roomname, username, socket))
        // socket.emit("joinRoom", { username, roomname });
      } else {
        alert("Please enter room name!");
        window.location.reload();
      }
    }
  };

  return (
    <div className="homepage">
      <div className="logo">
        <img
          className="img-responsive c1"
          style={{ width: 160 }}
          src={
            process.env.REACT_APP_API_URL + "/api/uno/images/Yellow_Draw.png"
          }
          alt="logo"
        />
        <img
          className="img-responsive c2"
          style={{ width: 160 }}
          src={
            process.env.REACT_APP_API_URL + "/api/uno/images/Green_Skip.png"
          }
          alt=""
        />
        <img
          className="img-responsive c3"
          style={{ width: 160 }}
          src={
            process.env.REACT_APP_API_URL + "/api/uno/images/Wild.png"
          }
          alt=""
        />
        <img
          className="img-responsive c4"
          style={{ width: 160 }}
          src={
            process.env.REACT_APP_API_URL + "/api/uno/images/Red_1.png"
          }
          alt=""
        />
        <img
          className="img-responsive c5"
          style={{ width: 160 }}
          src={
            process.env.REACT_APP_API_URL + "/api/uno/images/Blue_Reverse.png"
          }
          alt=""
        /></div>
      <h1 className="name">MULTIPLAYER</h1>
      <div className="input-box">
        <input
          className="roomInput"
          placeholder="Room Name"
          value={roomname}
          onChange={(e) => setroomname(e.target.value)}
        ></input>
        <br />
        {/* <Link to={`/multiplayer/${roomname}/${username}`}> */}
        <button className="roomBtn" onClick={createRoom}><p>Start</p></button>
        <button className="roomBtn" onClick={joinRoom}><p>Join</p></button>
        {/* </Link> */}</div>

    </div>
  );
}

export default RoomPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/room.css"
function RoomPage({ socket }) {
  // console.log("socket")
  // console.log(socket)

  const [username, setusername] = useState(localStorage.getItem("username"));
  const [roomname, setroomname] = useState("");
  //activates joinRoom function defined on the backend
  const sendData = () => {
    if (username === "") {
      alert("Error Occured. You should login again")
    } else {
      if (roomname !== "") {
        socket.emit("joinRoom", { username, roomname });
        //if empty error message pops up and returns to the same page
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
      <h1 class="name">MULTIPLAYER</h1>
      <div class="input-box">
        <input
          class="roomInput"
          placeholder="Room Name"
          value={roomname}
          onChange={(e) => setroomname(e.target.value)}
        ></input>
        <br />
        <Link to={`/multiplayer/${roomname}/${username}`}>
          <button class="roomBtn" onClick={sendData}><p>Start</p></button>
        </Link></div>

    </div>
  );
}

export default RoomPage;
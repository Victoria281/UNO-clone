// @ts-nocheck
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/room.css"
import { useSelector, useDispatch } from 'react-redux'
import { createNewRoom } from "../../../store/action/multiplayer/rooms"
import { useHistory } from "react-router-dom";
import Friend from "./FriendComponents/Friend"
import Room from "./Room"
import {
	Stack,
	Grid
} from '@mui/material';
const CreateRoom = ({ socket }) => {
	const dispatch = useDispatch();
	let history = useHistory();

	const [roomname, setroomname] = useState("");
	const [username,] = useState(localStorage.getItem("username"))
	const [friends,] = useState([
		{ username: "amanda1", status: true },
		{ username: "aisyah", status: false },
		{ username: "maryse", status: true },
		{ username: "wwf", status: true },
		{ username: "nic", status: false },
		{ username: "fren2", status: true },
	])
	const [rooms,] = useState([
		{ roomname: "amanda1" },
		{ roomname: "aisyah" },
		{ roomname: "maryse" },
		{ roomname: "wwf" },
		{ roomname: "nic" },
		{ roomname: "fren2" },
	])

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
		<>
			<Grid
				style={{ border: "1px solid grey", height: "95vh" }} container spacing={2}>
				<Grid
					style={{ border: "1px solid grey", height: "95vh" }} item xs={2}>
					<Stack direction="column" spacing={3}>
						{friends.map((data) => <Friend data={data} />)}
					</Stack>
				</Grid>
				<Grid
					style={{ border: "1px solid grey", height: "95vh" }} item xs={10}>
					<Stack direction="column" spacing={3}>
						{rooms.map((rdata) => <Room data={rdata} />)}
					</Stack>

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

				</Grid>
			</Grid>



		</>
	);
}

export default CreateRoom;
// @ts-nocheck
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/room.css"
import { useSelector, useDispatch } from 'react-redux'
import {
	enterMultiplayer,
	createNewRoom,
	joinRoom,
	joinRandomRoom,
	receiveListOfClients,
	sendRequestFriend,
	receiveRequestToPlay,
	onFriendRequestGameRejected,
	onFriendRequestGameAccepted,
	acceptFriendRequestGame,
	rejectFriendRequestGame,
	initialiseState
} from "../../../store/action/multiplayer/rooms"
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
	const [errors, setErrors] = useState("");

	const [roomname, setroomname] = useState("");
	const [username,] = useState(localStorage.getItem("username"))
	const room_state = useSelector(state => state.multiplayer_rooms)

	const create = () => {
		if (roomname !== "") {
			if (username == undefined) {
				console.log("Please Login First")
			} else {
				dispatch(createNewRoom(roomname, username, socket))
					.then(result =>history.push(`/multiplayer/${result}`))
			}
		} else {
			alert("Please enter room name!");
			window.location.reload();
		}
	}

	const join = () => {
		if (roomname !== "") {
			dispatch(joinRoom(roomname, username, socket))
				.then(result => history.push(`/multiplayer/${result}`))
		} else {
			alert("Please enter room name!");
			window.location.reload();
		}
	}

	const requestFriend = (friendUsername) => {
		dispatch(sendRequestFriend(username, socket, friendUsername))
	}

	const acceptFriend = (requestedUser) => {
		dispatch(acceptFriendRequestGame(username, socket, requestedUser))
	}

	const rejectFriend = (requestedUser) => {
		dispatch(rejectFriendRequestGame(username, socket, requestedUser))
	}

	const joinRandom = () => {
		dispatch(joinRandomRoom(username, socket))
	}




	useEffect(() => {
		dispatch(initialiseState()).then(()=>{
			if (username != undefined) {
				dispatch(enterMultiplayer(username, socket))
			}
		})
	}, []);

	useEffect(() => {
		socket.on("errorOccured", (data) => {
			console.log("ERROR")
			console.log(data.msg)
			setErrors(data.msg)
		});

		socket.on("multiplayerUpdate", (data) => {
			dispatch(receiveListOfClients(data))
		});

		socket.on("randomRoomFound", (data) => {
			history.push(`/multiplayer/${data.message}`)
		});

		socket.on("friendRejected", (data) => {
			dispatch(onFriendRequestGameRejected(data.message))
		});

		socket.on("friendRequestAccepted", (data) => {
			history.push(`/multiplayer/${data.message}`)
		});

		socket.on("friendRequesting", (data) => {
			console.log("someone wants to play with you")
			console.log(data)
			dispatch(receiveRequestToPlay(data))
		});

		// socket.on("friendRequestAccepted", (data) => {
		// 	console.log("Your friend Request was accepted")
		// 	console.log(data)
		// 	var username = localStorage.getItem("username")
		// 	var newRoom = {
		// 		username: username,
		// 		roomcode: data.message
		// 	}
		// 	socket.emit('othersJoinRoom', newRoom)
		// });


	}, [socket]);


	return (
		<>
			<Grid
				style={{ border: "1px solid grey", height: "95vh" }} container spacing={2}>
				<Grid
					style={{ border: "1px solid grey", height: "95vh" }} item xs={2}>
					<Stack direction="column" spacing={3}>
						{room_state.friends.map((data) => <Friend
							data={data}
							requestFriend={requestFriend}
						/>)}
					</Stack>
				</Grid>
				<Grid
					style={{ border: "1px solid grey", height: "95vh" }} item xs={10}>

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

							<button className="" onClick={() => { create() }}>Create Room</button><br />
							<button className="" onClick={() => { join() }}>Join Room</button><br />
							<button className="" onClick={() => { joinRandom() }}>Join Random Room</button><br />
						</div>
						<div>
							<p>Friend Requests</p>
							{room_state.friendRequests.map((data) =>
								<div>
									<p>{data.username} has requested to play UNO</p>
									<button className="" onClick={() => { acceptFriend(data) }}>accept</button><br />
									<button className="" onClick={() => { rejectFriend(data) }}>Reject</button><br />
									<hr />
								</div>
							)}
						</div>

						<div><p>{errors}</p></div>
					</div>


				</Grid>
			</Grid>



		</>
	);
}

export default CreateRoom;
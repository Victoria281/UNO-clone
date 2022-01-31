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
	List,
	Grid,
	Typography
} from '@mui/material';
import styles from "./styles.module.css"
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
					.then(result => history.push(`/multiplayer/${result}`))
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
		dispatch(initialiseState()).then(() => {
			if (username != undefined) {
				dispatch(enterMultiplayer(username, socket, localStorage.getItem("userid"), localStorage.getItem("token")))
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
			console.log("i FOUND A RANDOM ROMM")
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
	}, [socket]);


	return (
		<>
			<Grid
				className={styles.box} container spacing={2}>
				<Grid
					className={`${styles.box}`} item xs={3}>
					<p
						className={styles.friendHead}
					>Friends</p>
					<List className={styles.friends}>
						{room_state.friends.map((data) =>
							<Friend
								data={data}
								requestFriend={requestFriend}
							/>
						)}
					</List>
				</Grid>
				<Grid
					className={styles.box} item xs={9}>

					<div className="homepage">
						<div className={styles.cardsHome}>
							<img className={styles.cardImage1} src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild.png"} />
							<img className={styles.cardImage2} src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild_Draw.png"} />
						</div>

						<div className={styles["input-box"]}>
							<input
								className={styles.roomInput}
								placeholder="Room Name"
								value={roomname}
								onChange={(e) => { setroomname(e.target.value) }}
							></input>
							<br />
							<div className={`row d-flex justify-content-center`}>
								<button className={styles.startBtn} onClick={() => { create() }}>CREATE ROOM</button><br />
								<button className={styles.startMultiBtn} onClick={() => { join() }}>JOIN ROOM</button><br />
							</div>

							<button className={styles.randomBtn} onClick={() => { joinRandom() }}>JOIN RANDOM ROOM</button><br />
						</div>
						<div>
							<p>Friend Requests</p>
							{room_state.friendRequests.map((data) =>
								<div>
									<Typography>{data.username} has requested to play UNO</Typography>
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
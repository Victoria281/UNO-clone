// @ts-nocheck
import React, { Fragment, useState, useEffect } from "react";

//components
import SingleplayerGame from "./Component/SingleplayerComponent/gameRoom"
import GamePage from "./pages/game";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EndPage from "./pages/end";
import AccountPage from "./Component/AccountComponents/LoginComponent/account";
import RegisterPage from "./Component/AccountComponents/RegisterComponents/register";
import ProfilePage from "./pages/profile";
import LeaderboardPage from "./pages/leaderboard";
import Music from "./components/Music";
import Room from "./pages/multiplayer/room";
import MultiPlayer from "./pages/multiplayer/multiplayer";
import PageRestriction from "./PageRestriction"
import { NavLink } from 'react-router-dom'
import VerifyReset from './pages/verifyReset'
import ForgotPage from './pages/forgot'
import io from "socket.io-client";
import Loader from "./Component/OtherComponents/LoadingComponent/Loader"
//new
import MultiplayerCreateRoom from "./Component/MultiplayerComponents/createRoom"
import MultiplayerGameRoom from "./Component/MultiplayerComponents/gameRoom"
import WaitingRoom from "./pages/waitingRoom";

import DefaultNavBar from "./Component/OtherComponents/NavigationBar/DefaultNavBar"
const socket = io.connect(process.env.REACT_APP_API_URL);

function AppGameRoom(props) {
  return (
    <React.Fragment>
      <MultiplayerGameRoom
        roomcode={props.match.params.roomcode}
        socket={socket}
      />
    </React.Fragment>
  );
}

const App = ({ hideLoader }) => {
  useEffect(() => {
    hideLoader()
  });

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userid"));
  useEffect(() => {
      setInterval(() => {
          const userid = localStorage.getItem("userid");
          setLoggedIn(userid);
      }, 5000)
  }, []);

  // console.log(process.env.REACT_APP_SECRET_KEY)

  return (
    <Router>
      <Switch>
        <DefaultNavBar exact path="/" component={HomePage} loggedIn={loggedIn}/>
        <PageRestriction exact path="/load" component={Loader} />
        <PageRestriction exact path="/game" component={GamePage} />
        <PageRestriction exact path="/newgame" component={SingleplayerGame} />
        <PageRestriction exact path="/end" component={EndPage} />
        <Route exact path="/login" component={AccountPage} />
        <Route exact path="/register" component={RegisterPage} />
        <PageRestriction exact path="/profile" component={ProfilePage} />
        <PageRestriction exact path="/leaderboard" component={LeaderboardPage} />
        <Route exact path="/logout" component={Logout} />
        {/* <PageRestriction exact path="/createroom" component={Room} socket={socket}/> */}
        {/* <PageRestriction path="/multiplayer/:roomname/:username" component={Appmain} socket={socket}/> */}

        {/* new */}
        <Route exact path="/createroom" render={() => <MultiplayerCreateRoom socket={socket} />} />
        <Route path="/multiplayer/:roomcode" component={AppGameRoom} />
      </Switch>
    </Router >
  );
}
function Logout() {
  localStorage.removeItem("userid");
  localStorage.removeItem("token");
  window.location = '/';
}


export default App;
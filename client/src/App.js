// @ts-nocheck
import React, { useState, useEffect } from "react";

const dotenv = require('dotenv');
dotenv.config();

console.log(">>>>", process.env);

//components
import SingleplayerGame from "./Component/SingleplayerComponent/gameRoom"
import GamePage from "./pages/game";
import HomePage from "./Component/HomePageComponents/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EndPage from "./pages/end";
import AccountPage from "./Component/AccountComponents/LoginComponent/account";
import RegisterPage from "./Component/AccountComponents/RegisterComponents/register";
import ProfilePage from "./pages/profile";
import LeaderboardPage from "./Component/Leaderboard/tabs.jsx";
import Room from "./pages/multiplayer/room";
import MultiPlayer from "./pages/multiplayer/multiplayer";
import PageRestriction from "./PageRestriction"
import { NavLink } from 'react-router-dom'
import VerifyReset from './Component/AccountComponents/ResetComponent/verifyReset'
import ForgotPage from './Component/AccountComponents/ResetComponent/forgot'
import io from "socket.io-client";
import Loader from "./Component/OtherComponents/LoadingComponent/Loader"

import MultiplayerCreateRoom from "./Component/MultiplayerComponents/Dashboard/createRoom"
import MultiplayerGameRoom from "./Component/MultiplayerComponents/Game/gameRoom"

// Navigation Bars
import DefaultNavBar from "./Component/OtherComponents/NavigationBarComponent/DefaultNavBar"
import InGameNavBar from "./Component/OtherComponents/NavigationBarComponent/InGameNavBar";
import PreLoginNavBar from "./Component/OtherComponents/NavigationBarComponent/PreLoginNavBar";
import HomeNavBar from "./Component/OtherComponents/NavigationBarComponent/HomeNavBar";

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

  // console.log(process.env.REACT_APP_SECRET_KEY)
  //const [music, setMusic] = useState(false);
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
        <HomeNavBar exact path="/" component={HomePage} loggedIn={loggedIn}/>
        <PageRestriction exact path="/load" component={Loader} />
        <InGameNavBar exact path="/game" component={GamePage} />
        <InGameNavBar exact path="/newgame" component={SingleplayerGame} />
        <PageRestriction exact path="/end" component={EndPage} />
        <PreLoginNavBar exact path="/login" component={AccountPage} />
        <PreLoginNavBar exact path="/register" component={RegisterPage} />
        <DefaultNavBar exact path="/profile" component={ProfilePage} />
        <DefaultNavBar exact path="/leaderboard" component={LeaderboardPage} />
        <Route exact path="/logout" component={Logout} />
        {/* <PageRestriction exact path="/createroom" component={Room} socket={socket}/> */}
        {/* <PageRestriction path="/multiplayer/:roomname/:username" component={Appmain} socket={socket}/> */}

        {/* new */}
        <InGameNavBar exact path="/createroom" render={() => <MultiplayerCreateRoom socket={socket} />} />
        <InGameNavBar path="/multiplayer/:roomcode" component={AppGameRoom} />
      </Switch>
    </Router >
  );
}

function Logout() {
  localStorage.clear();
  window.location = '/login';
}


export default App;
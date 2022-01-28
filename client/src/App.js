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
import Music from "./Component/OtherComponents/MusicComponent/Music";
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
  const [music, setMusic] = useState(false);
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
        <nav className="navbar navbar-expand-sm navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <p className="brand d-none d-sm-block">
            <div className="card1"></div>
            <div className="card2"></div>
            <p className="logomain">NOU</p>
            <p className="logosub">uno-clone</p>
          </p>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active navbarDesign" style={{ background: '#e71e1e' }}>

                <NavLink to="/leaderboard" exact activeClassName="activeIcon"> <div className="borderHover" style={{ borderColor: '#e71e1e' }}><p className="nav-link navBarWord">
                  Ranks
                </p></div></NavLink>

              </li>
              <li className="nav-item active navbarDesign" style={{ background: '#1E9FE7' }}>

                <NavLink to="/" exact activeClassName="activeIcon"><div className="borderHover" style={{ borderColor: '#1E9FE7' }}><p className="nav-link navBarWord">
                  Game
                </p></div></NavLink>

              </li>
              <li className="nav-item active navbarDesign" style={{ background: '#46E71E' }}>

                <NavLink to="/profile" exact activeClassName="activeIcon"><div className="borderHover" style={{ borderColor: '#46E71E' }}><p className="nav-link navBarWord">
                  Profile
                </p></div></NavLink>

              </li>
              <li className="nav-item active navbarDesign" style={{ background: '#F5F93C' }}>
                <Account isLoggedIn={loggedIn}/>
              </li>
              <li className="nav-item active navbarDesign" style={{ background: '#FFB967' }}>
                <div className="borderHover" style={{ borderColor: '#FFB967' }}><p className="nav-link navBarWord">
                <Music isPlaying={music} setisPlaying={setMusic}/>
                </p></div>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
        <PageRestriction exact path="/" component={HomePage} />
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
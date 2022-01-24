// @ts-nocheck
import React, { useState, useEffect } from "react";

//components
import GamePage from "./pages/game";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EndPage from "./pages/end";
import AccountPage from "./pages/account";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import LeaderboardPage from "./pages/leaderboard";
import Music from "./components/Music";
import Room from "./pages/multiplayer/room";
import MultiPlayer from "./pages/multiplayer/multiplayer";
import PageRestriction from "./PageRestriction"
import { NavLink } from 'react-router-dom'
import io from "socket.io-client";
import NavigationBar from "./Component/NavigationBarComponents/navBar";

//new
import MultiplayerCreateRoom from "./Component/MultiplayerComponents/createRoom"
import MultiplayerGameRoom from "./Component/MultiplayerComponents/gameRoom"

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

const App = () => {

  return (
    <Router>
      <div>
        <NavigationBar/>

        <Switch>
          <PageRestriction exact path="/" component={HomePage} />
          <PageRestriction exact path="/game" component={GamePage} />
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
      </div>
    </Router>
  );
}

function Logout() {
  localStorage.removeItem("userid");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location = '/';
}


export default App;
// @ts-nocheck
import React, { Fragment, useState, useEffect } from "react";

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
import Loader from "./Component/OtherComponents/LoadingComponent/Loader"
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

const App=({hideLoader}) =>{
  useEffect(() => {
    hideLoader()
  });

  // console.log(process.env.REACT_APP_SECRET_KEY)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userid"));
  useEffect(() => {
        setInterval(() => {
            const userid = localStorage.getItem("userid");
            setLoggedIn(userid);
            }, [])
    }, 5000);

  return (
    <Router>
      <div>
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
                <Music/>
                </p></div>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
        <PageRestriction exact path="/" component={HomePage} />
        <PageRestriction exact path="/load" component={Loader} />
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
          <Route exact path="/createroom" render={()=><MultiplayerCreateRoom socket={socket}/>}/>
          <Route path="/multiplayer/:roomcode" component={AppGameRoom}/>
        </Switch>
      </div>
    </Router>
  );
}
function Logout() {
  localStorage.removeItem("userid");
  localStorage.removeItem("token");
  window.location = '/';
}
function Account(props) {
  if (props.isLoggedIn !== null) {
    return (
      <NavLink to="/logout" exact activeClassName="activeIcon"><div className="borderHover" style={{ borderColor: '#F5F93C' }}><p className="nav-link navBarWord">
        Logout
      </p></div></NavLink>
    );
  } else {
    return (
      <NavLink to="/login" exact activeClassName="activeIcon"><div className="borderHover" style={{ borderColor: '#F5F93C' }}><p className="nav-link navBarWord">
        Login
      </p></div></NavLink>
    );
  }
}


export default App;
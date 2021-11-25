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
import { NavLink } from 'react-router-dom';
import EndGame from "./EndGame";

const App=() =>{
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
            <div class="card1"></div>
            <div class="card2"></div>
            <p class="logomain">NOU</p>
            <p class="logosub">uno-clone</p>
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
            </ul>
          </div>
        </nav>

        <Switch>
          {/* <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route exact path="/game" render={(props) => <GamePage {...props} />} />
          <Route exact path="/end" render={(props) => <EndPage {...props} />} />
          <Route exact path="/login" render={(props) => <AccountPage {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
          <Route exact path="/profile" render={(props) => <ProfilePage {...props} />} />
          <Route exact path="/leaderboard" render={(props) => <LeaderboardPage {...props} />} />
          <Route exact path="/logout" render={(props) => <Logout />} /> */}

          <EndGame exact path="/" component={HomePage}/>
          <EndGame exact path="/game" component={GamePage}/>
          <EndGame exact path="/end" component={EndPage}/>
          <EndGame exact path="/profile" component={ProfilePage}/>
          <EndGame exact path="/leaderboard" component={LeaderboardPage}/>

          <Route exact path="/login" component={AccountPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/logout" component={Logout}/>

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
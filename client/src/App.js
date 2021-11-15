import React, { Fragment } from "react";

//components
import GamePage from "./pages/game";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EndPage from "./pages/end";
import AccountPage from "./pages/account";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import LeaderboardPage from "./pages/leaderboard";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          <p className="brand">UNO Clone</p>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active navbarDesign">
                <p className="nav-link navBarWord">
                  <Link to="/leaderboard">Ranks</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/">Game</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/profile">Profile</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/login">Login</Link>
                </p>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route exact path="/game" render={(props) => <GamePage {...props} />} />
          <Route exact path="/end" render={(props) => <EndPage {...props} />} />
          <Route exact path="/login" render={(props) => <AccountPage {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
          <Route exact path="/profile" render={(props) => <ProfilePage {...props} />} />
          <Route exact path="/leaderboard" render={(props) => <LeaderboardPage {...props} />} />
          <Route exact path="/logout" render={(props) => <Home {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

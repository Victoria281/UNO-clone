import React, { Fragment } from "react";

//components
import GamePage from "./pages/game";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EndPage from "./pages/end";
import AccountPage from "./pages/account";
import RegisterPage from "./pages/register";

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
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/">Home</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/leaderboard">Leaderboard</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/account">Account</Link>
                </p>
              </li>
              <li className="nav-item active">
                <p className="nav-link">
                  <Link to="/register">Register</Link>
                </p>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route
            exact
            path="/game"
            render={(props) => <GamePage {...props} />}
          />
          <Route exact path="/end" render={(props) => <EndPage {...props} />} />
          <Route exact path="/account" render={(props) => <AccountPage {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Home {...props} />}
          />
          <Route exact path="/login" render={(props) => <Home {...props} />} />
          <Route exact path="/signup" render={(props) => <Home {...props} />} />
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

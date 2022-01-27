



// @ts-ignore
import { Fragment, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Music from "../../../components/Music";


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

const DefaultNavBar = ({ exact, path, component: Component, loggedIn , ...rest}) => {
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
        return (
            <>
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
                                    <Account isLoggedIn={loggedIn} />
                                </li>
                                <li className="nav-item active navbarDesign" style={{ background: '#FFB967' }}>
                                    <div className="borderHover" style={{ borderColor: '#FFB967' }}><p className="nav-link navBarWord">
                                        <Music />
                                    </p></div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Component {...routeProps} />
            </>
        )
    }}
    />
}

export default DefaultNavBar;
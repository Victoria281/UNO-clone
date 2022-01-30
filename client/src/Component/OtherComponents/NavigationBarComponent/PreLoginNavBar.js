// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, Grid, Tooltip, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { NavLink } from 'react-router-dom'

// Icons Import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';

// Components Import
import Account from "./Account";

const PreLoginNavBar = ({ exact, path, component: Component, loggedIn, ...rest }) => {

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
                                    <NavLink to="/leaderboard" exact activeClassName="activeIcon">
                                        <div className="borderHover" style={{ borderColor: '#e71e1e' }}>
                                            <p className="nav-link navBarWord">
                                                Ranks
                                            </p>
                                        </div>
                                    </NavLink>
                                </li>

                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle nav-item active navbarDesign" type="button" data-toggle="dropdown" style={{ background: '#D27C2C' }}>
                                        <SettingsIcon />
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li
                                            style={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#DC9F66",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <Tooltip title="Music" placement="left">
                                                <MusicNoteIcon />
                                            </Tooltip>
                                        </li>

                                        <li
                                            style={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#DC9F66",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <Tooltip title="Background Animation" placement="left">
                                                <ViewInArIcon />
                                            </Tooltip>
                                        </li>

                                        <li
                                            style={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#DC9F66",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <Tooltip title="Tutorial" placement="left">
                                                <QuestionMarkIcon />
                                            </Tooltip>
                                        </li>
                                    </ul>
                                </div>

                                <li className="nav-item active navbarDesign" style={{ background: '#F5F93C' }}>
                                    <Account isLoggedIn={null} />
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

export default PreLoginNavBar;
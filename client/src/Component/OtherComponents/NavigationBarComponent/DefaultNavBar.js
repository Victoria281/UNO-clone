// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Box, Button, AppBar, Grid, styled, InputLabel, MenuItem, FormControl, Select, Tooltip } from '@mui/material';
import { useState } from "react";

import { NavLink } from 'react-router-dom'

// icons import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import Music from "../MusicComponent/Music";

// Components Import
import Account from "./Account";
import styles from "./styles.module.css"
import BotDifficultyModal from "../BotDifficultyComponent/BotDifficultyModal";
import { useState } from "react";

const DefaultNavBar = ({ exact, path, component: Component, loggedIn, ...rest }) => {
    const [open, setOpen] = useState(false);
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {

        const id = localStorage.getItem("userid");

        if(!id){
            return <Redirect to="/login" />
        }

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

                        <div className="brand d-none d-sm-block">
                            <div className="card1"></div>
                            <div className="card2"></div>
                            <p className="logomain">NOU</p>
                            <p className="logosub">uno-clone</p>
                        </div>

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
                                    <li className="dropdown-toggle nav-item active navbarDesign" data-toggle="dropdown" style={{ background: '#1E9FE7' }}>
                                        <div className="borderHover" style={{ borderColor: '#1E9FE7' }}>
                                            <p className="nav-link navBarWord">
                                                Games
                                            </p>
                                            <span className="caret"></span>
                                        </div>
                                    </li>
                                    <ul className={`dropdown-menu ${styles.dropmenu}`}>
                                        <li
                                            style={{
                                                borderRadius: 200,
                                                backgroundColor: "#45B3F0",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                            className={`navbarDesign ${styles.menu}`}
                                        >
                                             <BotDifficultyModal open={open} setOpen={setOpen}/>
                                            <Button onClick={()=>{setOpen(true)}}>
                                                <Tooltip title="SinglePlayer" placement="left">
                                                    <PersonIcon className={styles.icons} />
                                                </Tooltip>
                                            </Button>
                                        </li>

                                        <li
                                            style={{
                                                borderRadius: 200,
                                                backgroundColor: "#70BAE3",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                            className={`navbarDesign ${styles.menu}`}
                                        >
                                            <NavLink to="/createroom">
                                                <Tooltip title="MultiPlayer" placement="left">
                                                    <SportsEsportsIcon className={styles.icons} />
                                                </Tooltip>
                                            </NavLink>

                                        </li>
                                    </ul>
                                </div>

                                <li className="nav-item active navbarDesign" style={{ background: '#46E71E' }}>
                                    <NavLink to="/profile" exact activeClassName="activeIcon">
                                        <div className="borderHover" style={{ borderColor: '#46E71E' }}>
                                            <p className="nav-link navBarWord">
                                                Profile
                                            </p>
                                        </div>
                                    </NavLink>
                                </li>

                                <div className="dropdown">
                                    <button className="btn btn-primary dropdown-toggle nav-item active navbarDesign" type="button" data-toggle="dropdown" style={{ background: '#D27C2C' }}>
                                        <SettingsIcon style={{ fill: "black" }} />
                                        <span className="caret" ></span>
                                    </button>

                                    <ul className={`dropdown-menu ${styles.dropmenu}`}>
                                        <li
                                            style={{
                                                borderRadius: 200,
                                                backgroundColor: "#DC9F66",
                                                color: "black",
                                                fontFamily: 'RubikOne',
                                                marginBottom: 20,
                                            }}
                                            className={`navbarDesign ${styles.menu}`}
                                        >
                                            <Tooltip title="Music" placement="left">
                                                <Music/>
                                            </Tooltip>
                                        </li>

                                        <li
                                            style={{
                                                borderRadius: 200,
                                                backgroundColor: "#D9AD84",
                                                color: "black",
                                                fontFamily: 'RubikOne',
                                                marginBottom: 20,
                                            }}
                                            className={`navbarDesign ${styles.menu}`}
                                        >
                                            <Tooltip title="Background Animation" placement="left">
                                                <ViewInArIcon className={styles.icons} />
                                            </Tooltip>
                                        </li>

                                        <li
                                            style={{
                                                borderRadius: 200,
                                                backgroundColor: "#E8B88B",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                            className={`navbarDesign ${styles.menu}`}
                                        >
                                            <Tooltip title="Tutorial" placement="left">
                                                <QuestionMarkIcon className={styles.icons} />
                                            </Tooltip>
                                        </li>
                                    </ul>
                                </div>

                                <li className="nav-item active navbarDesign" style={{ background: '#F5F93C' }}>
                                    <Account isLoggedIn={loggedIn} />
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
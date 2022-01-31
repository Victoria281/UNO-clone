// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, AppBar, Grid, styled, InputLabel, MenuItem, FormControl, Select, Tooltip } from '@mui/material';

import { NavLink } from 'react-router-dom'

// Icons Import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsIcon from '@mui/icons-material/Settings';
import Music from "../MusicComponent/Music";

import styles from "./styles.module.css"

const InGameNavBar = ({ exact, path, component: Component, ...rest }) => {
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
                                                <Music />
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

                                <li className="nav-item active navbarDesign" style={{ background: '#e71e1e' }}>
                                    <NavLink to="/" exact activeClassName="activeIcon">
                                        <div className="borderHover" style={{ borderColor: '#e71e1e' }}>
                                            <p className="nav-link navBarWord">
                                            &nbsp;Exit
                                            </p>
                                        </div>
                                    </NavLink>
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

export default InGameNavBar;
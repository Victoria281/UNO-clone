// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, AppBar, Grid } from '@mui/material';

import { NavLink } from 'react-router-dom'

// Icons Import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

// Components Import
import Account from "./Account";

const HomeNavBar = ({ exact, path, component: Component, loggedIn, ...rest }) => {
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
                                    <div className="borderHover" style={{ borderColor: '#e71e1e' }}>
                                        <p className="nav-link navBarWord">
                                            <MusicNoteIcon />
                                        </p>
                                    </div>
                                </li>

                                <li className="nav-item active navbarDesign" style={{ background: '#1E9FE7' }}>
                                    <div className="borderHover" style={{ borderColor: '#1E9FE7' }}>
                                        <p className="nav-link navBarWord">
                                            <ViewInArIcon />
                                        </p>
                                    </div>
                                </li>

                                <li className="nav-item active navbarDesign" style={{ background: '#46E71E' }}>
                                    <div className="borderHover" style={{ borderColor: '#46E71E' }}>
                                        <p className="nav-link navBarWord">
                                            <QuestionMarkIcon />
                                        </p>
                                    </div>
                                </li>


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

export default HomeNavBar;
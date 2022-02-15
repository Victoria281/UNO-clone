// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import { Box, Button, AppBar, Grid, Tooltip } from '@mui/material';

import { NavLink } from 'react-router-dom'

// Icons Import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

// Components Import
// @ts-ignore
import Account from "./Account";
import Music from "../MusicComponent/Music";
import styles from "./styles.module.css"
import Tutorial from "../../TutorialComponent/Tutorial";
import { useState } from "react";

const HomeNavBar = ({ exact, path, component: Component, loggedIn, ...rest }) => {
    const [isTutorialOpen, setisTutorialOpen] = useState(false);
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
                                    <div className="borderHover" style={{ borderColor: '#e71e1e' }}>
                                        <div className="nav-link navBarWord">
                                            <Music />
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item active navbarDesign" style={{ background: '#1E9FE7' }}>
                                    <div className="borderHover" style={{ borderColor: '#1E9FE7' }}>
                                        <ViewInArIcon className={styles.icons} />
                                    </div>
                                </li>

                                <li className="nav-item active navbarDesign" style={{ background: '#46E71E' }}>
                                    <div className="borderHover" style={{ borderColor: '#46E71E' }}>
                                        <Tutorial
                                            isTutorialOpen={isTutorialOpen}
                                            setisTutorialOpen={setisTutorialOpen}
                                        />
                                        <Button onClick={() => setisTutorialOpen(true)}>
                                            <QuestionMarkIcon className={styles.icons} />
                                        </Button>
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
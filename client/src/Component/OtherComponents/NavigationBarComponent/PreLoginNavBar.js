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

                                <div className="nav-item active navbarDesign" style={{ background: '#F5F93C' }}>
                                    
                                </div>

                                <li className="nav-item active navbarDesign" style={{ background: '#F5F93C' }}>
                                    <Account isLoggedIn={null} />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>


                {/* <Grid container>
                    <Grid xs={8.1}>
                        <p className="brand d-none d-sm-block">
                            <div className="card1"></div>
                            <div className="card2"></div>
                            <p className="logomain">NOU</p>
                            <p className="logosub">uno-clone</p>
                        </p>
                    </Grid>

                    <Grid xs={1.3}>
                        <Button
                            variant="contained"
                            sx={{
                                height: 40,
                                width: 100,
                                mt: 2.5,
                                borderRadius: 100 / 50,
                                backgroundColor: "#E71E1E",
                                color: "black",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                    backgroundColor: "#B11C1C",
                                }
                            }}
                            href="./leaderboard"
                        >
                            Ranks
                        </Button>
                    </Grid>

                    <Grid xs={1.3}>
                        <FormControl
                            sx={{
                                height: 40,
                                width: 100,
                                mt: 2.5,
                                borderRadius: 100 / 50,
                                backgroundColor: "#D27C2C",
                                color: "black",
                                fontFamily: 'RubikOne'
                            }}>

                            <InputLabel sx={{ color: "black", fontFamily: 'RubikOne', pb: 3, fontSize: 13 }}>Setting</InputLabel>

                            <Select
                                size='small'
                            >
                                <MenuItem
                                    sx={{
                                        width: 100
                                    }}
                                >
                                    <Tooltip title="Music" placement="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#DC9F66",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <MusicNoteIcon />
                                        </Button>
                                    </Tooltip>
                                </MenuItem>


                                <MenuItem
                                    sx={{
                                        width: 100
                                    }}
                                >
                                    <Tooltip title="Background Animation" placement="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#D9AD84",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <ViewInArIcon />
                                        </Button>
                                    </Tooltip>
                                </MenuItem>


                                <MenuItem
                                    sx={{
                                        width: 100
                                    }}
                                >
                                    <Tooltip title="Tutorial" placement="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#E8B88B",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <QuestionMarkIcon />
                                        </Button>
                                    </Tooltip>
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={1.3}>
                        <Button
                            variant="contained"
                            sx={{
                                height: 40,
                                width: 100,
                                mt: 2.5,
                                borderRadius: 100 / 50,
                                backgroundColor: "#F5F93C",
                                color: "white",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                }
                            }}
                        >
                            <Account isLoggedIn={null} />
                        </Button>
                    </Grid>
                </Grid> */}
                <Component {...routeProps} />
            </>
        )
    }}
    />
}

export default PreLoginNavBar;
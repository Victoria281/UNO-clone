// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, AppBar, Grid, styled, InputLabel, MenuItem, FormControl, Select, Tooltip } from '@mui/material';

// icons import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

// Components Import
import Account from "./Account";

const DefaultNavBar = ({ exact, path, component: Component, loggedIn, ...rest }) => {
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {

        return (
            <>
                <Grid container>
                    <Grid xs={5.5}>
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
                                color: "white",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
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
                                backgroundColor: "#1E9FE7",
                                color: "black",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                }
                            }}>

                            <InputLabel sx={{ color: "black", fontFamily: 'RubikOne' }}>Game</InputLabel>

                            <Select
                                size='small'
                            >
                                <MenuItem
                                    sx={{
                                        width: 100
                                    }}
                                >
                                    <Tooltip title="Single Player" placement="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#56BAF2",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <PersonIcon />
                                        </Button>
                                    </Tooltip>
                                </MenuItem>


                                <MenuItem
                                    sx={{
                                        width: 100
                                    }}
                                >
                                    <Tooltip title="MultiPlayer" placement="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 100 / 50,
                                                backgroundColor: "#7DBCDF",
                                                color: "black",
                                                fontFamily: 'RubikOne'
                                            }}
                                        >
                                            <SportsEsportsIcon />
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
                                backgroundColor: "#46E71E",
                                color: "white",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                }
                            }}
                            href="./profile"
                        >
                            Profile
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
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                }
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
                        <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }}>
                            <Account isLoggedIn={loggedIn} />
                        </Button>
                    </Grid>
                </Grid>
                <Component {...routeProps} />
            </>
        )
    }}
    />
}

export default DefaultNavBar;
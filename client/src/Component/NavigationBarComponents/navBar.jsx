// @ts-nocheck
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Box, Button, AppBar, Grid, styled, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';

// Components import
import Music from '../../components/Music';

// icons import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const NavigationBar = ({ }) => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userid"));
    const url = useState(location.href);
    const currentUrl = url[0]
    console.log(currentUrl)

    const StyledSpeedDial = styled(SpeedDial)(({ }) => ({
        height: 40,
        width: 100
    }));

    const actions = [
        { icon: <MusicNoteIcon />, name: "Music"},
        { icon: <ViewInArIcon />, name: "Animation" },
        { icon: <QuestionMarkIcon />, name: "Tutorial" }
    ];

    const gameactions = [
        { icon: <PersonIcon />, name: "Single Player", link: "http://localhost:3000/game"  },
        { icon: <SportsEsportsIcon />, name: "Multi Player", link: "http://localhost:3000/createroom" }
    ];

    useEffect(() => {
        setInterval(() => {
            const userid = localStorage.getItem("userid");
            setLoggedIn(userid);
        }, [])
    }, 5000);

    const Account = ({ }) => {
        if (loggedIn !== null) {
            return (
                <NavLink to="/logout" exact activeClassName="activeIcon">
                    <div className="borderHover" style={{ borderColor: '#F5F93C' }}>
                        <p className="nav-link navBarWord">
                            Logout
                        </p>
                    </div>
                </NavLink>
            );
        } else {
            return (
                <NavLink to="/login" exact activeClassName="activeIcon">
                    <div className="borderHover" style={{ borderColor: '#F5F93C' }}>
                        <p className="nav-link navBarWord">
                            Login
                        </p>
                    </div>
                </NavLink>
            );
        }
    }

    const HomeBar = ({ }) => {
        return (
            <Grid container>
                <Grid xs={6.8}>
                    <p className="brand d-none d-sm-block">
                        <div className="card1"></div>
                        <div className="card2"></div>
                        <p className="logomain">NOU</p>
                        <p className="logosub">uno-clone</p>
                    </p>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<MusicNoteIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<ViewInArIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<QuestionMarkIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }}>
                        <Account loggedIn />
                    </Button>
                </Grid>
            </Grid>
        )
    }

    const DefaultBar = ({ }) => {

        return (
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
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }} href="./leaderboard">
                        Ranks
                    </Button>
                </Grid>

                <Grid xs={1.3}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial"
                        icon={<SpeedDialIcon />}
                        direction={"down"}
                    >
                        {gameactions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                href={action.link}
                            />
                        ))}
                    </StyledSpeedDial>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }} href="./profile">
                        Profile
                    </Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }}>
                        <Account loggedIn />
                    </Button>
                </Grid>

                <Grid xs={1.3}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial"
                        icon={<SpeedDialIcon />}
                        direction={"down"}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </StyledSpeedDial>
                </Grid>
            </Grid>
        )
    }

    const GameBar = ({ }) => {
        console.log(window.location.href);
        return (
            <Grid container>
                <Grid xs={9.4}>
                    <p className="brand d-none d-sm-block">
                        <div className="card1"></div>
                        <div className="card2"></div>
                        <p className="logomain">NOU</p>
                        <p className="logosub">uno-clone</p>
                    </p>
                </Grid>

                <Grid xs={1.3}>
                    <StyledSpeedDial
                        ariaLabel="SpeedDial"
                        icon={<SpeedDialIcon />}
                        direction={"down"}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </StyledSpeedDial>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }} href="./">Exit</Button>
                </Grid>
            </Grid>
        )
    }

    const NotLoginBar = ({ }) => {
        return (
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
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }}>
                        Ranks
                    </Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<MusicNoteIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<ViewInArIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" startIcon={<QuestionMarkIcon />} sx={{ height: 40, width: 100, mt: 2.5 }}></Button>
                </Grid>

                <Grid xs={1.3}>
                    <Button variant="contained" sx={{ height: 40, width: 100, mt: 2.5 }}>
                        <Account loggedIn />
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box>
            <AppBar position="static" sx={{ height: 80, bgcolor: 'transparent', boxShadow: 'none' }}>
                {
                    (loggedIn == null) ? <NotLoginBar />
                        : (currentUrl == "http://localhost:3000/") ? <HomeBar />
                            : (currentUrl == "http://localhost:3000/game" || currentUrl == "http://localhost:3000/multiplayer") ? <GameBar />
                                : <DefaultBar />
                }
            </AppBar>
        </Box>
    )

}

export default NavigationBar;
// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, AppBar, Grid} from '@mui/material';

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
                                }
                            }}
                        >
                            <MusicNoteIcon />
                        </Button>
                    </Grid>

                    <Grid xs={1.3}>
                        <Button
                            variant="contained"
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
                            }}
                        >
                            <ViewInArIcon />
                        </Button>
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
                                color: "black",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "white",
                                }
                            }}
                        >
                            <QuestionMarkIcon />
                        </Button>
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

export default HomeNavBar;
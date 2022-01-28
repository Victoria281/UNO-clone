// @ts-ignore
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, AppBar, Grid, styled , InputLabel, MenuItem, FormControl, Select, Tooltip} from '@mui/material';

// Icons Import
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const InGameNavBar = ({ exact, path, component: Component, ...rest }) => {
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {

        return (
            <>
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
                        <Button
                            variant="contained"
                            sx={{
                                height: 40,
                                width: 100,
                                mt: 2.5,
                                borderRadius: 100 / 50,
                                backgroundColor: "#33984B",
                                color: "white",
                                fontFamily: 'RubikOne',
                                '&:hover': {
                                    color: "black",
                                }
                            }}
                            href="./">
                            Exit
                        </Button>
                    </Grid>
                </Grid>
                <Component {...routeProps} />
            </>
        )
    }}
    />
}

export default InGameNavBar;
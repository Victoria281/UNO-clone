// @ts-nocheck
import { Grid, Typography, Avatar, CircularProgress, Box, Stack, Button, Divider, createTheme, ThemeProvider } from '@mui/material';
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { purple, blue } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import styles from "./styles.module.css"
import {
    movePlayerToAudience,
    moveAudienceToPlayer
} from "../../../../store/action/multiplayer/rooms"
import botLogo from "./image/bot-logo.png"

const WaitingRoom = ({ roomcode, handleStart, socket }) => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');
    const [owner, setOwner] = useState(false);

    const { room_state, unconnected } = useSelector(state => {
        const room_state = state.multiplayer_rooms
        const unconnected = []
        for (var i = 0; i < 4 - state.multiplayer_rooms.players.length; i++) {
            unconnected.push("Waiting")
        }
        return { room_state, unconnected }
    })

    const boxColor = purple['200'];
    const boxBorder = purple['500'];

    // const copyLink = process.env.REACT_APP_API_URL + "/multiplayer/" + roomcode;
    const copyLink = "http://localhost:3000/multiplayer/" + roomcode;

    const theme = createTheme({
        typography: {
            fontFamily: 'RubikOne',
        }
    });

    const CircularProgressWithLabel = () => {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={room_state.players.length * 25} color="inherit" size='80px' />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" component="div" color="text.primary">
                        {room_state.players.length}/4
                    </Typography>
                </Box>
            </Box>
        );
    }

    const CopyCode = ({ copyCode }) => {
        const [codeCopy, setCodeCopy] = useState(false);

        async function copyCodeToClipboard(code) {
            if ('clipboard' in navigator) {
                return await navigator.clipboard.writeText(code);
            } else {
                return document.execCommand('copy', true, code);
            }
        }

        const handleCopyCode = () => {
            // Asynchronously call copyTextToClipboard
            copyCodeToClipboard(copyCode)
                .then(() => {
                    // If successful, update the setCodeCopy state value
                    setCodeCopy(true);
                    setTimeout(() => {
                        setCodeCopy(false);
                    }, 1500);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <Grid container
                sx={{
                    border: 1,
                    borderColor: boxBorder,
                    borderRadius: 15,
                    width: 750,
                    ml: 5,
                    mt: 1
                }}
            >
                <Grid item xs={7} sx={{ textAlign: 'center' }}>
                    <Typography variant="h5">{roomcode}</Typography>

                </Grid>

                <Divider orientation="vertical" />

                <Grid item xs={4}>
                    <Button
                        sx={{
                            width: 310,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            ':hover': {
                                bgcolor: 'secondary.main',
                                color: 'white'
                            },
                        }}
                        variant="text" onClick={handleCopyCode} color="inherit" startIcon={<ContentCopyIcon />}>
                        <Box>{codeCopy ? 'Copied!' : 'Copy Code'}</Box>
                    </Button>
                </Grid>
            </Grid>
        );
    }

    const CopyLink = ({ copyLink }) => {
        const [linkCopy, setLinkCopy] = useState(false);

        async function copyLinkToClipboard(link) {
            if ('clipboard' in navigator) {
                return await navigator.clipboard.writeText(link);
            } else {
                return document.execCommand('copy', true, link);
            }
        }

        const handleCopyLink = () => {
            copyLinkToClipboard(copyLink)
                .then(() => {
                    setLinkCopy(true);
                    setTimeout(() => {
                        setLinkCopy(false);
                    }, 1500);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <Grid container
                sx={{
                    border: 1,
                    borderColor: boxBorder,
                    borderRadius: 15,
                    width: 750,
                    ml: 5,
                    mt: 3
                }}
            >
                <Grid item xs={7} sx={{ textAlign: 'center', pt: 0.5 }}>
                    <Typography variant="subtitle2">https://uno-clone.herokuapp.com/multiplayer/{roomcode}</Typography>
                </Grid>

                <Divider orientation="vertical" />

                <Grid item xs={4}>
                    <Button
                        sx={{
                            width: 310,
                            height: 50,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            ':hover': {
                                bgcolor: 'secondary.main',
                                color: 'white'
                            },
                        }} variant="text" onClick={handleCopyLink} color="inherit" startIcon={<ContentCopyIcon />}>
                        <Box>{linkCopy ? 'Copied!' : 'Copy Link'}</Box>
                    </Button>
                </Grid>
            </Grid>
        );
    }

    const handleMoveToAudience = (audience_user, socket) => {
        if (username === room_state.owner.username) {
            console.log("im the owner. Moving player to audience")
            dispatch(movePlayerToAudience(audience_user, socket))
        }
    }

    const handleMoveToPlayer = (player_user, socket) => {
        if (username === room_state.owner.username) {
            console.log("im the owner. Moving audience to player")
            dispatch(moveAudienceToPlayer(player_user, socket))
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 1000,
                    height: 600,
                    backgroundColor: boxColor,
                    border: 1,
                    borderColor: boxBorder,
                    borderRadius: 15,
                    m: "auto",
                    mt: 3,
                    boxShadow: 5
                }}
            >
                <Grid container sx={{ mb: 2, ml: 3, mt: 4 }}>
                    <Grid item xs={12} sx={{ pl: 36, fontFamily: 'RubikOne' }}>
                        <Typography variant="h4">waiting for others...</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ pl: 10, pt: 5 }}>

                    {room_state.players.map((data) =>

                        <Grid item xs={3}>
                            {
                                username !== room_state.owner.username
                                    ? <Avatar
                                        style={owner == true ? { color: "red" } : { color: "black" }}
                                        sx={{ width: 135, height: 135, bgcolor: "#1565c0" }}
                                        onClick={() => {
                                            handleMoveToAudience(data.username, socket)
                                        }}
                                        className={styles.movetoAudience}
                                    // src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
                                    />
                                    : <div className={styles.profile}>
                                        <Avatar
                                            style={owner == true ? { color: "red" } : { color: "black" }}
                                            sx={{ width: 135, height: 135, bgcolor: "#1565c0" }}
                                            onClick={() => {
                                                handleMoveToAudience(data.username, socket)
                                            }}
                                            className={styles.movetoAudience}
                                        // src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
                                        />
                                        <div className={styles.movetoAudienceTxt}>Move To Audience</div>
                                    </div>
                            }

                            <Box
                                sx={{
                                    width: 180,
                                    height: 40,
                                    ml: -3,
                                    mt: 2.3
                                }} >
                                <Typography variant="h5" sx={{ color: "#01579b", textAlign: "center", pt: 0.4 }}>{data.username}</Typography>
                            </Box>
                        </Grid>
                    )}

                    {unconnected.map((data) => {
                        return (<Grid item xs={3}>
                            <CircularProgress color="warning" size='130px' />
                            <Box
                                sx={{
                                    width: 180,
                                    height: 40,
                                    ml: -3.2,
                                    mt: 2
                                }} >
                                <Typography variant="h5" sx={{ color: "#d46105", textAlign: "center", pt: 0.4 }}>{data}</Typography>
                            </Box>
                        </Grid>)
                    }
                    )}

                    <Grid sx={{ ml: 5, mt: 1 }}>
                        <Grid className={styles.botImage}>
                            <img alt="Bot" src={botLogo} width="90" height="90" style={{ marginLeft: "20px" }} />
                        </Grid>

                        <Grid className={styles.bot}>
                            <button className={styles.addbot}>
                                Add Bot
                            </button>
                            
                            <button className={styles.minusbot}>
                                Remove Bot
                            </button>
                        </Grid>
                    </Grid>
                    {/* className={styles.ChatDrawer} */}

                    <Grid sx={{ mt: 3, ml: 5, mb: 1 }}>
                        <CircularProgressWithLabel />
                    </Grid>

                    <Grid sx={{ ml: 7, mt: 4 }}>
                        <button onClick={() => { handleStart() }} className="roomBtn">
                            <p>Start</p>
                        </button>
                    </Grid>

                    <Grid sx={{ ml: 5, mt: 1 }}>
                        <p className={styles.txtStyle}><b>Audience:</b></p>
                    </Grid>

                    <Grid sx={{ ml: 2, mt: 1 }}>
                        {
                            room_state.audience.map((data) =>
                                <Grid container>
                                    <Grid xs={9}>
                                        <p className={styles.txtStyle}>{data.username}</p>
                                    </Grid>
                                    <Grid xs={3}>
                                        <button
                                            className={styles.movebtn}
                                            onClick={() => {
                                                handleMoveToPlayer(data.username, socket)
                                            }}
                                        >
                                            Move
                                        </button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>

                    <CopyCode copyCode={roomcode} />
                    <CopyLink copyLink={copyLink} />
                </Grid>
            </Box >
        </ThemeProvider>
    );
}

export default WaitingRoom;


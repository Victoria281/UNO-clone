// @ts-nocheck
import { Grid, Typography, Avatar, CircularProgress, Box, Stack, Button, Divider, createTheme, ThemeProvider } from '@mui/material';
import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { purple, blue } from '@mui/material/colors';
import { Link } from "react-router-dom";

const WaitingRoom = () => {
    const [progress, setProgress] = useState(25);
    const [noOfPeople, setnoOfPeople] = useState(1);
    const [roomname,] = useState(localStorage.getItem("roomname"));
    const uname = localStorage.getItem('username');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const boxColor = purple['200'];
    const boxBorder = purple['500'];

    const copyLink = "https://uno-clone.herokuapp.com/multiplayer/" + uname;

    const theme = createTheme({
        typography: {
            fontFamily: 'RubikOne',
        }
    });

    const CircularProgressWithLabel = () => {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={progress} color="inherit" size='80px' />
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
                        {noOfPeople}/4
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
                    <Typography variant="h5">{roomname}</Typography>

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
                    <Typography variant="subtitle2">https://uno-clone.herokuapp.com/multiplayer/{roomname}</Typography>
                </Grid>

                <Divider orientation="vertical" />

                <Grid item xs={4}>
                    <Button
                        sx={{
                            width: 310,
                            height:50,
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
                    <Grid item xs={3}>
                        <Avatar
                            sx={{ width: 135, height: 135, bgcolor: blue[500] }}
                        // src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
                        >
                            Player
                        </Avatar>
                        <Box
                            sx={{
                                width: 180,
                                height: 40,
                                ml: -3,
                                mt: 2.3
                            }} >
                            <Typography variant="h5" sx={{ color: "#3C56AF", textAlign: "center", pt: 0.4 }}>{uname}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <CircularProgress color="warning" size='130px' />
                        <Box
                            sx={{
                                width: 180,
                                height: 40,
                                ml: -3.2,
                                mt: 2
                            }} >
                            <Typography variant="h5" sx={{ color: "#d46105", textAlign: "center", pt: 0.4 }}>Guest 1</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <CircularProgress color="success" size='130px' />
                        <Box
                            sx={{
                                width: 180,
                                height: 40,
                                ml: -3.2,
                                mt: 2
                            }} >
                            <Typography variant="h5" sx={{ color: "#1F5558", textAlign: "center", pt: 0.4 }}>Guest 2</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={3}>
                        <CircularProgress color="inherit" size='130px' />
                        <Box
                            sx={{
                                width: 180,
                                height: 40,
                                ml: -3.2,
                                mt: 2
                            }} >
                            <Typography variant="h5" sx={{ color: "#000000", textAlign: "center", pt: 0.4 }}>Guest 3</Typography>
                        </Box>
                    </Grid>

                    <Grid sx={{ mt: 4, ml: 35 }}>
                        <CircularProgressWithLabel />
                    </Grid>

                    <Grid sx={{ ml: 10, mt: 4 }}>
                        <Link to={`/multiplayer/${roomname}`}>
                            <button className="roomBtn">
                                <p>Start</p>
                            </button>
                        </Link>
                    </Grid>

                    <CopyCode copyCode={roomname} />
                    <CopyLink copyLink={copyLink} />
                </Grid>
            </Box >
        </ThemeProvider>
    );
}

export default WaitingRoom;
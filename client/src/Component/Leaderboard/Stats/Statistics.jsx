// Type Imports
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';

// MUI Material Library Imports
import { Typography, Box, Link } from '@mui/material';

// CSS Module Imports
import styles from '../styles.module.css';

/**
 * Checks the store for the user's information and display it 
 * when the statistics tab is clicked on
 * @returns {JSX.Element}
 * JSX Element to display the user's game statistics
 */
const DisplayStatsData = () => {
    const userStats = useSelector(
        /**
         * Selector function to get the user's statistics from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns the user's statistics from the store
         */
        (state) => state.profile_info.userStats
    );
    // console.log("userStats", userStats.score);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let totalGames = 0;
    let totalWins = 0;
    let lastGame = new Date();

    if (userStats.score !== undefined) {
        totalGames = userStats.score.length;

        for (let i = 0; i < userStats.score.length; i++) {
            // console.log("userStats.score[" + i + "].created_at", new Date(userStats.score[i].created_at));

            if (userStats.score[i].game_status === 1) {
                totalWins++;
            }

            if (i === 0) {
                lastGame = new Date(userStats.score[i].created_at);
            }

            if (lastGame < new Date(userStats.score[i].created_at)) {
                lastGame = new Date(userStats.score[i].created_at);
            }
        };

        // console.log("totalWins", totalWins);
        // console.log("lastGame", lastGame);
        const latestGameDate = lastGame.getDate() + " " + months[lastGame.getMonth()] + " " + lastGame.getFullYear();

        return (
            <Box className={`row no-gutters ${styles.gameBody}`}>
                <Box className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3`}>
                    <Box className='row no-gutters mt-4'>
                        <Box className='col-sm-3'></Box>
                        <Box className='col-sm-3'>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Total Games:</Typography>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Total No. of Wins:</Typography>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Latest Game:</Typography>
                        </Box>

                        <Box className='col-sm-2'>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>{totalGames}</Typography>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>{totalWins}</Typography>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>{latestGameDate}</Typography>
                        </Box>
                        <Box className='col-sm-4'></Box>
                    </Box>

                    <Box className='row no-gutters mt-4'>
                        <Box className='col-sm-3'></Box>
                        <Box className='col-sm-6'>
                            <Box className='row no-gutters' sx={{ marginTop: 4 }}>
                                <Box className="col-sm-1" sx={{ paddingY: 2 }}>
                                    <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}></Typography>
                                </Box>
                                <Box className="col-sm-2" sx={{ paddingY: 2 }}>
                                    <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Status</Typography>
                                </Box>
                                <Box className="col-sm-2" sx={{ paddingY: 2 }}>
                                    <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Score</Typography>
                                </Box>
                                <Box className="col-sm-7" sx={{ paddingY: 2 }}>
                                    <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Played Date</Typography>
                                </Box>
                            </Box>

                            <Box className={styles.leaderboard_body}>
                                {userStats.score.map((score, index) => {
                                    let pastDates = new Date(score.created_at);
                                    console.log("pastDates", pastDates);
                                    let aP = pastDates.getHours() >= 12 ? 'PM' : 'AM';
                                    let fullDate = pastDates.getDate() + " " + months[pastDates.getMonth()] + " " + pastDates.getFullYear() + ", " + pastDates.getHours() + ":" + pastDates.getMinutes() + " " + aP;

                                    return (
                                        <Box className={styles.leaderboard_player}>
                                            <Box className='row no-gutters'>
                                                <Box className="col-sm-1" sx={{ paddingY: 2 }}>
                                                    <Typography align='center' sx={{ padding: 1, fontWeight: 'bold' }}>{index + 1}</Typography>
                                                </Box>
                                                <Box className="col-sm-2" sx={{ paddingY: 2 }}>
                                                    <Typography align='center' sx={{ padding: 1 }}>{score.game_status === 0 ? "Loose" : "Win"}</Typography>
                                                </Box>
                                                <Box className="col-sm-2" sx={{ paddingY: 2 }}>
                                                    <Typography align='center' sx={{ padding: 1 }}>{score.score}</Typography>
                                                </Box>
                                                <Box className="col-sm-7" sx={{ paddingY: 2 }}>
                                                    <Typography align='center' sx={{ padding: 1 }}>{fullDate}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                        </Box>
                        <Box className='col-sm-3'></Box>
                    </Box>
                </Box>
            </Box>
        );
    } else {
        return (
            <Box className={`row no-gutters ${styles.gameBody}`}>
                <Box className='col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3'>``
                    <Box className='row no-gutters mt-4'>
                        <Box className='col-sm-3'></Box>
                        <Box className='col-sm-3'>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Total Games:</Typography>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Total No. of Wins:</Typography>
                            <Typography align='right' variant='h6' sx={{ width: '100%', fontWeight: 'bold', padding: 1, }}>Latest Game:</Typography>
                        </Box>

                        <Box className='col-sm-2 leaderboard_col'>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>{totalGames}</Typography>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>{totalWins}</Typography>
                            <Typography align='center' variant='h6' sx={{ width: '100%', padding: 1, }}>N/A</Typography>
                        </Box>
                        <Box className='col-sm-4'></Box>
                    </Box>

                    <Box className='row no-gutters' sx={{ marginTop: 4 }}>
                        <Box className="col-sm-1 leaderboard_col" sx={{ paddingY: 2 }}>
                            <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Game</Typography>
                        </Box>
                        <Box className="col-sm-2 leaderboard_col" sx={{ paddingY: 2 }}>
                            <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Status</Typography>
                        </Box>
                        <Box className="col-sm-2 leaderboard_col" sx={{ paddingY: 2 }}>
                            <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Score</Typography>
                        </Box>
                        <Box className="col-sm-7 leaderboard_col" sx={{ paddingY: 2 }}>
                            <Typography variant='h6' align='center' sx={{ padding: 1, fontWeight: 'bold' }}>Date</Typography>
                        </Box>
                    </Box>

                    <Box className='leaderboard_body'>
                        <Box className='row no-gutters'>
                            <Box className='col-sm-12 leaderboard_col'>
                                <Typography align='center' sx={{ width: '100%' }}>
                                    There are no past records of any games played!
                                </Typography>
                                <Typography align='center' sx={{ width: '100%' }}>
                                    If you think this is an error, <Link href='/logout' underline='hover'>{"please re-login again!"}</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default DisplayStatsData;
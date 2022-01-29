import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Type Imports
import { RootState } from '../../../store/types';
import { UserLeaderboard } from '../../../store/types';

// CSS Module Imports
import styles from '../styles.module.css';

// MUI Material Library Imports
import { Typography, Box } from '@mui/material';

const UserLdbComponent = () => {
    const users = useSelector(
        /**
         * Selector function to get the leaderboard scores from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns the leaderboard scores from the store
         */
        (state) => state.leaderboard_leaderboard.user_leaderboard
    );

    return users;
}

const OtherPlayers =
    () => {
        const displayHeight = window.innerHeight;
        console.log("displayHeight:", displayHeight);

        /**
         * @type {UserLeaderboard}
         */
        const allPlayers = UserLdbComponent();

        // console.log("OtherPlayers, User:", users);
        let printed = 0;
        let newIndex = 1;
        let uid = localStorage.getItem('userid');
        let convUid = 0;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        if (uid === null) {
            convUid = 0;
        } else {
            convUid = parseInt(uid);
        }

        return (allPlayers === undefined || allPlayers === null) ?
            (
                <Box className={styles.leaderboard_body}>
                    <Box className={`row no-gutters ${styles.leaderboard_player}`}>
                        <Typography>Uh Oh! This isn't supposed to happen!</Typography>
                    </Box>
                    <Box className={`row no-gutters ${styles.leaderboard_player}`}>
                        <Typography>Please re-login again!</Typography>
                    </Box>
                </Box>
            )
            : (
                <Box>
                    <Box className={styles.leaderboard_body} sx={{ maxHeight: 'fit-content' }}>
                        {allPlayers.map((players, index) => {

                            let date = new Date(players.created_at);
                            let createdAtString = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + (date.getHours() > 12 ? "PM" : "AM");

                            if (players.userid === convUid) {
                                return (
                                    <Box className={`row no-gutters ${styles.leaderboard_player}`} key={players.userid}>
                                        <Box className='col-sm-2' sx={{ padding: 2 }}>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center', paddingY: 2 }}>{index + 4}</Typography>
                                        </Box>

                                        <Box className='col-sm-8 row no-gutters'>
                                            <Box className='col-sm-2' sx={{ paddingY: 2, paddingX: 2 }}>
                                                <img
                                                    className={`img-responsive ${styles.ldbRowIcon}`}
                                                    alt="pic"
                                                    src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + players.profileicon + ".png"}
                                                />
                                            </Box>

                                            <Box className='col-sm-10' sx={{ paddingY: 2, paddingX: 2 }}>
                                                <Typography sx={{ padding: 2 }}>{players.username}</Typography>
                                            </Box>
                                        </Box>

                                        <Box className='col-sm-2' sx={{ paddingY: 2 }}>
                                            <Typography sx={{ padding: 2 }}>{players.score}</Typography>
                                        </Box>
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box className={`row no-gutters ${styles.leaderboard_row}`} key={players.userid}>
                                        <Box className='col-sm-2' sx={{ padding: 2 }}>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center', paddingY: 2 }}>{index + 4}</Typography>
                                        </Box>

                                        <Box className='col-sm-8 row no-gutters'>
                                            <Box className='col-sm-2' sx={{ paddingY: 2, paddingX: 2 }}>
                                                <img
                                                    className={`img-responsive ${styles.ldbRowIcon}`}
                                                    alt="pic"
                                                    src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + players.profileicon + ".png"}
                                                />
                                            </Box>

                                            <Box className='col-sm-10' sx={{ paddingY: 2, paddingX: 3 }}>
                                                <Typography sx={{ padding: 2 }}>{players.username}</Typography>
                                            </Box>
                                        </Box>

                                        <Box className='col-sm-2' sx={{ paddingY: 2 }}>
                                            <Typography sx={{ padding: 2 }}>{players.score}</Typography>
                                        </Box>
                                    </Box>
                                )
                            }
                        })}
                    </Box>
                </Box>
            );
    }

export default OtherPlayers;
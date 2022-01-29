import { useSelector, useDispatch } from 'react-redux';
import React, { Suspense, useEffect } from 'react';

// Type Imports
import { RootState, Leaderboard } from '../../../store/types';

// MUI Material Library Imports
import { Typography, Box, Avatar, Button } from '@mui/material';

// CSS Module Imports
import styles from '../styles.module.css';

// Other Imports
import crownImage from "../../../icons/pepicons_crown.png";
import OtherPlayers from './OtherPlayers';
import Loader from '../../OtherComponents/LoadingComponent/Loader';
import { updateCurrentUserStats } from '../../../store/action/others/stats';
import { getTop30Players } from '../../../store/action/others/leaderboard';
import Top3Players from "./Top3Players"


const DisplayLeaderboard = () => {
    const dispatch = useDispatch();
    /**
     * @type {Leaderboard}
     */
    const leaderboard = useSelector(
        /**
         * Selector function to get player 1 (top player) from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns player 1 (top player) from the store
         */
        (state) => state.leaderboard_leaderboard
    );

    useEffect(() => {
        const userId = localStorage.getItem('userid');
        const token = localStorage.getItem('token');

        let userInfo = {
            userId: 0,
            token: "",
        };

        if (userId !== null && token !== null) {
            userInfo = {
                userId: parseInt(userId),
                token: token,
            };

            // console.log("running!");
            dispatch(updateCurrentUserStats(userInfo));
            dispatch(getTop30Players());
        }

    }, []);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const updatedDate = new Date();
    const formattedMin = updatedDate.getMinutes().toString().length === 1 ? `0${updatedDate.getMinutes()}` : updatedDate.getMinutes();
    const formattedDate = `${updatedDate.getDate()} ${months[updatedDate.getMonth()]} ${updatedDate.getFullYear()} ${updatedDate.getHours()}:${formattedMin}`;
    // optional: ${(updatedDate.getHours() >= 12) ? 'PM' : 'AM'}
    // console.log("Updated Date:", formattedDate);

    return (

        <Box>
            {
                leaderboard.user_leaderboard.length > 0 ?
                    <Box className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <Box className={`row no-gutters ${styles.gameBody}`}>
                            <Box className='col-xl-7 col-lg-7 col-md-4 col-sm-4'>
                                <Box className={`row no-gutters ${styles.ldbPodium} ${styles.pillarBody}`} alignContent={'end'} textAlign={'end'}>
                                    <Box className={`col-sm-4 col-md-4 col-lg-4 col-xl-4 h-100`}>
                                        <Suspense fallback={<Loader />}>
                                            <Top3Players playerNum={2} player={leaderboard.topPlayers[1]} />
                                        </Suspense>
                                    </Box>
                                    <Box className={`col-sm-4 col-md-4 col-lg-4 col-xl-4 h-100`}>
                                        <Suspense fallback={<Loader />}>
                                            <Top3Players playerNum={1} player={leaderboard.topPlayers[0]} />
                                        </Suspense>
                                    </Box>
                                    <Box className={`col-sm-4 col-md-4 col-lg-4 col-xl-4 h-100`}>
                                        <Suspense fallback={<Loader />}>
                                            <Top3Players playerNum={3} player={leaderboard.topPlayers[2]} />
                                        </Suspense>
                                    </Box>

                                </Box>
                            </Box>

                            <Box className='col-xl-5 col-lg-5 col-md-6 col-sm-6'>

                                <Box className={`row no-gutters ${styles.leaderboard_header}`}>
                                    <Box className='col-sm-2'>
                                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>No</Typography>
                                    </Box>

                                    <Box className='col-sm-8'>
                                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold' }}>Players</Typography>
                                    </Box>

                                    <Box className='col-sm-2'>
                                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold' }}>Score</Typography>
                                    </Box>
                                </Box>

                                <Suspense fallback={<Loader />}>
                                    <OtherPlayers />
                                </Suspense>
                            </Box>
                        </Box>
                        <Box className='row no-gutters'>
                            <Box className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Typography textAlign={'center'} sx={{ padding: 1, fontSize: 12 }}>Last updated on: {formattedDate}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <p>Loading</p>
            }
        </Box>
    );

};

export default DisplayLeaderboard;
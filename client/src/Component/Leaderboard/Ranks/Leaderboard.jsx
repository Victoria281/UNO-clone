// @ts-nocheck

import { useSelector, useDispatch } from 'react-redux';
import React, { Suspense, useEffect } from 'react';

// Type Imports
import { RootState } from '../../../store/types';
import { UserScores } from '../../../store/types';

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


/**
 * Checks the localStorage for the token and userId set when the user logs in.
 * If the token and userId are found, an action is dispatched to the store to
 * fetch the user's information and thereafter store it inside the store.
 */



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

            console.log("running!");

            dispatch(updateCurrentUserStats(userInfo));
            dispatch(getTop30Players());
        }
    }, []);


    return (
        <div>
            {leaderboard.user_leaderboard.length > 0 ?
                <Box className={`row no-gutters ${styles.gameBody}`}>
                    <Box className='col-xl-7 col-lg-7 col-md-12 col-sm-12'>
                        <Box className={`row no-gutters ${styles.ldbPodium} ${styles.pillarBody}`} alignContent={'end'} textAlign={'end'}>
                            <Suspense fallback={<Loader />}>
                                <Top3Players playerNum={1} player={leaderboard.topPlayers[0]} />
                                <Top3Players playerNum={2} player={leaderboard.topPlayers[1]} />
                                <Top3Players playerNum={3} player={leaderboard.topPlayers[2]} />

                            </Suspense>

                        </Box>
                    </Box>

                    <Box className='col-xl-5 col-lg-5 col-md-12 col-sm-12'>

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
                :
                <p>Loading</p>
            }
        </div>
    );
};

export default DisplayLeaderboard;
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import Confetti from 'react-confetti';
import { Suspense } from 'react';

// Type Imports
import { RootState } from '../../../store/types';

// MUI Material Library Imports
import { Typography, Box, Avatar, Button } from '@mui/material';

// CSS Module Imports
import styles from '../styles.module.css';

// Other Imports
import crownImage from "../../../icons/pepicons_crown.png";
import OtherPlayers from './OtherPlayers';
import { LoadingScreen } from '../../loadingScreen';
import { updateCurrentUserStats } from '../../../store/action/leaderboard/stats';
// import confetti from 'canvas-confetti'
import Confetti from 'react-canvas-confetti';

const DisplayLeaderboard = () => {
    const player1 = useSelector(
        /**
         * Selector function to get player 1 (top player) from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns player 1 (top player) from the store
         */
        (state) => state.leaderboard_leaderboard.p1
    );
    const player2 = useSelector(
        /**
         * Selector function to get player 2 (top player) from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns player 2 (top player) from the store
         */
        (state) => state.leaderboard_leaderboard.p2
    );
    const player3 = useSelector(
        /**
         * Selector function to get player 3 (top player) from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns player 3 (top player) from the store
         */
        (state) => state.leaderboard_leaderboard.p3
    );

    const [showConfetti, setShowConfetti] = useState(true);

    const canvasStyles = {
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    };



    let animationInstance = null;

    let makeShot = (particleRatio, opts) => {
        animationInstance && animationInstance({
            ...opts,
            origin: { y: 0.7 },
            particleCount: Math.floor(200 * particleRatio),
        });
    }

    let fire = () => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.2, {
            spread: 60,
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    let handleFire = () => {
        fire();
    };

    let getInstance = (instance) => {
        animationInstance = instance;
    };


    return (
        <Box className={`row no-gutters ${styles.gameBody}`}>
            <Box className='col-xl-7 col-lg-7 col-md-12 col-sm-12'>
                <Box className={`row no-gutters ${styles.ldbPodium} ${styles.pillarBody}`} alignContent={'end'} textAlign={'end'}>
                    <Box className={`col-sm-4 p-2 ${styles.podiumPillar2}`}>
                        <Box className={styles.lb2IconBorder}>
                            <Avatar className={styles.lb1Icons} alt="2ndPlace" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + player2.profileicon + ".png"}></Avatar>
                        </Box>
                        <Box className={styles.borderDesign2}>
                            <Box alignContent={'end'} className='d-flex'>
                                <Box className={styles.podiumTriangle2}></Box>
                            </Box>
                            <Typography className={styles.lbuserheader}>{player2.username}</Typography>
                            <Typography className={styles.lbuser} sx={{ fontWeight: 'bold' }}>{player2.score} pts</Typography>
                        </Box>
                    </Box>

                    <Box className={`col-sm-4 p-2 ${styles.podiumPillar1}`}>
                        <Box alignContent={'end'} className={styles.crownBox}>
                            <Avatar className={styles.crown} alt="1stPlace" src={crownImage}></Avatar>
                        </Box>

                        <Box className={styles.lb1IconBorder}>
                            <Avatar className='lb1Icons' alt='1stPlace' src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + player1.profileicon + ".png"}></Avatar>
                        </Box>

                        <Box className={styles.borderDesign1}>
                            <Box alignContent={'end'} className='d-flex'>
                                <Box className={styles.podiumTriangle1}></Box>
                            </Box>
                            <Typography className={styles.lbuserheader}>{player1.username}</Typography>
                            <Typography className={styles.lbuser} sx={{ fontWeight: 'bold' }}>{player1.score} pts</Typography>
                        </Box>
                    </Box>

                    <Box className={`col-sm-4 p-2 ${styles.podiumPillar3}`}>
                        <Box className={styles.lb3IconBorder}>
                            <Avatar className='lb1Icons' alt='3rdPlace' src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + player3.profileicon + ".png"}></Avatar>
                        </Box>

                        <Box className={styles.borderDesign3}>
                            <Box alignContent={'end'} className='d-flex'>
                                <Box className={styles.podiumTriangle3}></Box>
                            </Box>
                            <Typography className={styles.lbuserheader}>{player3.username}</Typography>
                            <Typography className={styles.lbuser} sx={{ fontWeight: 'bold' }}>{player3.score} pts</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className='col-xl-5 col-lg-5 col-md-12 col-sm-12'>

                <Box className='row no-gutters'>
                    <Box className='col-sm-2'>
                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>No</Typography>
                    </Box>

                    <Box className='col-sm-5'>
                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold' }}>Players</Typography>
                    </Box>

                    <Box className='col-sm-2'>
                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold' }}>Score</Typography>
                    </Box>

                    <Box className='col-sm-3'>
                        <Typography variant='h6' className='p-1' sx={{ fontWeight: 'bold' }}>Created</Typography>
                    </Box>
                </Box>

                <Suspense fallback={<LoadingScreen />}>
                    <OtherPlayers />
                </Suspense>
            </Box>

        </Box>
    );
};

export default DisplayLeaderboard;

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

const Top3Players = ({ playerNum, player }) => {

    return (
        <Box className={`col-sm-4 p-2 ${styles['podiumPillar' + playerNum]}`}>
            <Box className={styles['lb' + playerNum + 'IconBorder']}>
                {player.profileicon?
                    <img className={styles.lb1Icons} alt="2ndPlace" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + player.profileicon + ".png"}></img>
                    :
                    <img className={styles.lb1Icons} alt="2ndPlace" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/bird.png"}></img>
                }
            </Box>
            <Box className={styles['borderDesign' + playerNum]}>
                <Box alignContent={'end'} className='d-flex'>
                    <Box className={styles['podiumTriangle' + playerNum]}></Box>
                </Box>
                <Typography className={styles.lbuserheader}>{player.username ? player.username : "undefined"}</Typography>
                <Typography className={styles.lbuser} sx={{ fontWeight: 'bold' }}>{player.score ? player.score : "undefined"} pts</Typography>
            </Box>
        </Box>
    )
}

export default Top3Players;
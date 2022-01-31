// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {Grid, Modal , Typography, Button, Box, Paper} from '@mui/material'
import {
    playCard,
} from "../../../store/action/singleplayer/game"
import { useDispatch } from 'react-redux'
import styles from '../styles.module.css'


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

const EndGameModal = ({ endGameModalOpen, setEndGameModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("closing")
        setOpen(false);
        setEndGameModalOpen(false)
    }
    const dispatch = useDispatch();

    return (
        <Modal
            open={(open || endGameModalOpen) && card !== undefined}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.colormodal}
        >
            <Paper className={styles.colormodalcontainer}>

                <Grid container rowSpacing={4}>

                    <Grid item md={12}>
                        <Box className={styles.colormodaltitlecontainer}><Typography variant='h4' className={styles.colormodaltitle}> Game End </Typography></Box>
                    </Grid>

                    <Grid item md={12}>
                        <Box className={styles.colormodaltitlecontainer}><Typography variant='h6' className={styles.colormodaltitle}> You Won...? Points Scored: </Typography></Box>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Box className={styles.btncontainer}>
                            <Button
                                variant="contained"
                                color='warning'
                                onClick={()=>{
                                    handleClose();
                                }}
                            >
                                OK
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </Paper>
        </Modal>
    );
}

export default EndGameModal;

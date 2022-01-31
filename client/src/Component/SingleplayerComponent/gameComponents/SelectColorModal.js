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

const SelectColorModal = ({ card, socket, selectColorModalOpen, setSelectColorModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("closing")
        setOpen(false);
        setSelectColorModalOpen(false)
    }
    const dispatch = useDispatch();

    const handleSelectColor = (color) =>{
        console.log("not closing?")
        handleClose()
        dispatch(playCard(card, color));
    }
    return (
        <Modal
            open={(open || selectColorModalOpen) && card !== undefined}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className = {styles.colormodal}
        >
            <Paper className = {styles.colormodalcontainer}>

                <Grid container rowSpacing={4}>
                    
                    <Grid item md={12}>
                        <Box className={styles.colormodaltitlecontainer}><Typography variant='h4' className={styles.colormodaltitle}> Select A Color </Typography></Box>
                    </Grid>
                  
                       <Grid item md={3}>
                       <Box className={styles.btncontainer}>
                                <Button
                                 variant="contained"
                                className={styles.btnRed}
                                color='error'
                                    onClick={() => {
                                        handleSelectColor("red")
                                    }}
                                >
                                   ---
                                </Button>
                       </Box>
                       </Grid>
    
                        <Grid item md={3}>
                        <Box className={styles.btncontainer}>
                            <Button
                             variant="contained"
                            className={styles.btnBlue}
                            color='primary'
                                onClick={() => {
                                    handleSelectColor("blue")
                                }}
                            >
                                 ---
                            </Button>
                            </Box>
                        </Grid>
    
                       <Grid item md={3}>
                       <Box className={styles.btncontainer}>
                            <Button
                             variant="contained"
                            className={styles.btnYellow}
                            color='warning'
                                onClick={() => {
                                    handleSelectColor("yellow")
                                }}
                            >
                                 ---
                            </Button>
                        </Box>
                       </Grid>
                        <Grid item md={3}>
                        <Box className={styles.btncontainer}>
                            <Button
                             variant="contained"
                            className={styles.btnGreen}
                            color='success'
                                onClick={() => {
                                    handleSelectColor("green")
                                }}
                            >
                                ---
                            </Button>
                            </Box>
                        </Grid>


                </Grid >  

            </Paper>
        </Modal>
    );
}

export default SelectColorModal;

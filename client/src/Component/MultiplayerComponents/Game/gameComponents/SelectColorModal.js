// @ts-nocheck
import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Paper , Grid } from '@mui/material';
import {
    sendPlayerAction
} from "../../../../store/action/multiplayer/game"
import { useDispatch } from 'react-redux'

import styles from "../styles.module.css"

const SelectColorModal = ({ card, socket, selectColorModalOpen, setSelectColorModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("closing")
        setOpen(false);
        setSelectColorModalOpen(false)
    }
    const dispatch = useDispatch();

    const handleSelectColor = (color) => {
        console.log("not closing?")
        handleClose()
        dispatch(sendPlayerAction("play", socket, { card: card, color: color }))
    }
    return (
        <Modal
            open={open || selectColorModalOpen}
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

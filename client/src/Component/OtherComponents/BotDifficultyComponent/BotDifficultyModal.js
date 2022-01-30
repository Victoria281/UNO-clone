//@ts-nocheck
import { Fragment, useState } from 'react';
import { Modal, Slider, Box, Typography, Grid, Button, Paper} from '@mui/material';
import styles from './styles.module.css';

const BotDifficultyModal = ({open, setOpen}) => {
    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                className = {styles.modalcontainer}
            >
                    <Paper className = {styles.modalbox}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={styles.modaltitlecontainer}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.modaltitle} >
                                    Select Your Bot Difficulty:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={styles.modalslidercontainer}>
                                <Slider
                                    aria-label="Difficulty"
                                    defaultValue={30}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                    className={styles.modalslider}
                                />
                            </Grid>
                            <Grid item xs={12}>
                               <Box className={styles.modalendcontainer}>
                                   <Button variant = "contained" className={styles.modalendbtn}>
                                       <Typography className={styles.modalendbtntext}>Confirm</Typography>
                                   </Button>
                               </Box>
                            </Grid>
                        </Grid>
                    </Paper>
            </Modal>
        </Fragment>
    )
}

export default BotDifficultyModal;
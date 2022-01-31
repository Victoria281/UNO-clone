//@ts-nocheck
import { Fragment, useState } from 'react';
import { Modal, Slider, Box, Typography, Grid, Button, Paper} from '@mui/material';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { prepareBotSettings } from '../../../store/action/singleplayer/game';
import { useHistory } from 'react-router-dom';

const BotDifficultyModal = ({open, setOpen}) => {
    const dispatch = useDispatch();
    let history = useHistory()
    const [sliderVal, setSliderVal] = useState(0);
    
    function handleClose() {
        setOpen(false);
    }

    function setSettings(){
        dispatch(prepareBotSettings(sliderVal));
        history.push("/game")
        handleClose();
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
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={0}
                                    max={100}
                                    className={styles.modalslider}
                                    onChangeCommitted={(e, val)=> {setSliderVal(val)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                               <Box className={styles.modalendcontainer}>
                                   <Button variant = "contained" className={styles.modalendbtn} onClick={() => setSettings()}>
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
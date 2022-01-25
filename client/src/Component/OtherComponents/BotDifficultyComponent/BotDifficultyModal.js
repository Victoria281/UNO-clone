import { Fragment, useState } from 'react';
import { Modal, Slider, Box, Typography, Grid, Button, Paper} from '@mui/material';

const BotDifficultyModal = ({open, setOpen}) => {
    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box>
                    <Paper>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Select Your Bot Difficulty
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Slider
                                    aria-label="Difficulty"
                                    defaultValue={30}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={10}
                                    max={110}
                                />
                            </Grid>
                            <Grid item xs={12}>
                               <Button variant = "contained">
                                   <Typography>Confirm</Typography>
                               </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default BotDifficultyModal;
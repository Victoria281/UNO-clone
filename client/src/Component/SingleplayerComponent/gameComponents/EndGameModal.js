// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Grid, Modal, Typography, Button, Box, Paper } from '@mui/material'
import {
    playCard,
} from "../../../store/action/singleplayer/game"
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles.module.css'
import { useHistory } from "react-router-dom";


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

    const { game_state, points } = useSelector(state => {
        const game_state = state.singleplayer_game
        var points = 10;
        if (game_state.playerdeck["player0"].length === 0) {
            for (var card in game_state.playerdeck) {
                game_state.playerdeck[card].map((single)=>{
                    if (single.color === "wild"){
                        points += 5;
                    } else {
                        points += 5;
                    }
                })
            }
        }
        return { game_state, points }
    })

    let history = useHistory();

    return (
        <Modal
            open={(open || endGameModalOpen) && card !== undefined}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.colormodal}
            disableBackdropClick
        >
            <Paper className={styles.colormodalcontainer}>

                <Grid container rowSpacing={4}>

                    <Grid item md={12}>
                        <Box className={styles.colormodaltitlecontainer}>
                            <Typography variant='h4' className={styles.colormodaltitle}>
                                Game End
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item md={12}>
                        <Box className={styles.colormodaltitlecontainer}>
                            {
                                game_state.playerdeck["player0"].length === 0 ?
                                    <Typography variant='h6' className={styles.colormodaltitle}>
                                        You Won! Points Scored: {points}
                                    </Typography>
                                    :
                                    <Typography variant='h6' className={styles.colormodaltitle}>
                                        You Lost! Points Scored: 10
                                    </Typography>
                            }

                        </Box>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Box className={styles.btncontainer}>
                            <Button
                                variant="contained"
                                color='warning'
                                onClick={() => {
                                    history.push("/")
                                }}
                            >
                                Leave Game
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

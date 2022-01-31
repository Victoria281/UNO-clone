// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Grid, Modal, Typography, Button, Box, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useHistory } from "react-router-dom";

const EndGameModal = ({ endGameModalOpen, setEndGameModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const { room_state, game_state, winner, total } = useSelector(state => {
        const room_state = state.multiplayer_rooms
        const game_state = state.multiplayer_rooms.game_state
        var total = 0;
        var winner;
        for (var card in game_state.playerdeck) {
            if (game_state.playerdeck[card].length === 0) {
                winner = card
            }
            game_state.playerdeck[card].map((single) => {
                if (single.color === "wild") {
                    total += 5;
                } else {
                    total += 5;
                }
            })
        }
        return { room_state, game_state, total, winner }
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
            {game_state.end === true &&
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
                                {room_state.myTurnIs !== -1 ?
                                    game_state.playerdeck["player" + room_state.myTurnIs].length === 0 ?
                                        <Typography variant='h6' className={styles.colormodaltitle}>
                                            You Won! Points Scored: {total}
                                        </Typography>
                                        :
                                        <Typography variant='h6' className={styles.colormodaltitle}>
                                            {winner} Won! Points Scored: {total}
                                        </Typography>
                                    :
                                    <Typography variant='h6' className={styles.colormodaltitle}>
                                        {winner} Won! Points Scored: {total}
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
            }
        </Modal>
    );
}

export default EndGameModal;

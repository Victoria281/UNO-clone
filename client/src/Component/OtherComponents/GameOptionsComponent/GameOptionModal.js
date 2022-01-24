import { Typography } from '@material-ui/core';
import {Modal, Box, Grow, Grid, Button, Switch} from '@mui/material';
import styles from './styles.module.css';

const GameOptionModal = ({open, setOpen}) => {
    console.log("Game Options Modal Opened");

    function setClose (){
        setOpen(false);
        console.log("Game Options modal Closed")
    }

    return (
        <Modal
        open={open}
        onClose={setClose}
        closeAfterTransition
        className={styles.modal}
        >
            <Grow
            in={open}
            >
                <Box className={styles.box}>
                    <Grid container rowSpacing={2}>
                        <Grid item md={12} >
                            <Typography variant='h5' className={styles.title} >
                                Choose Game Options: 
                            </Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Box className={styles.options}>
                                <Grid container className={styles.row}>
                                    <Grid item md={8}><Typography variant='h6' className={styles.desc}>Enable +2</Typography></Grid>
                                    <Grid item md={4} className={styles.switch}><Switch /></Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Box className={styles.options}>
                                <Grid container className={styles.row}>
                                    <Grid item md={8}><Typography variant='h6' className={styles.desc}>Enable 7</Typography></Grid>
                                    <Grid item md={4} className={styles.switch}><Switch color='warning'/></Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Box className={styles.options}>
                                <Grid container className={styles.row}>
                                    <Grid item md={8}><Typography variant='h6' className={styles.desc}>Enable 0</Typography></Grid>
                                    <Grid item md={4} className={styles.switch}><Switch color='error'/></Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={8}></Grid>
                        <Grid item md={4} className={styles.startbtncontainer}>
                            <Button variant='contained' className={styles.startbtn}><Typography className={styles.startbtntext}>Start</Typography></Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grow>
        </Modal>
    );

}

export default GameOptionModal;
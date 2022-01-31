import { Snackbar, LinearProgress, Alert, Box, Slide , Button} from '@mui/material';
import { Fragment, useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './styles.module.css';

const FriendsNotification = ({ uopen, usetOpen }) => {
    const [mopen, msetOpen] = useState(false)

    function handleClose() {
        console.log("Snackbar Closed")
        usetOpen({ open: false, type: 'secondary', message: '' });
    }

    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    const Progress = () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        console.log("Progress finished")
                        handleClose();
                        return 0;
                    }
                    const diff = Math.random() * 60;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 500);

            return () => {
                clearInterval(timer);
            };
        }, []);

        return (
            <LinearProgress color={uopen.type} sx={{ width: '100%' }} variant="determinate" value={progress} />
        )
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={mopen || uopen.open}
            onClose={() => { handleClose() }}
            TransitionComponent={TransitionDown}
        >
            {
                uopen.open &&
                <Box sx={{ width: '100%' }}>
                    <Alert className={styles.messagecontainer} severity={uopen.type} sx={{ width: '100%' }} action={
                       <div>
                            <Button variant='contained' color="inherit" size="small" className={styles.checkBtn}>
                                <CheckIcon color="success"/>
                            </Button>
                            <Button variant='contained' color="inherit" size="small" className={styles.xBtn}>
                                <ClearIcon color="error"/>
                            </Button>
                       </div>
                    }>
                        {uopen.message}
                    </Alert>
                    <Progress />
                </Box>
            }

        </Snackbar>
    )
}

export default FriendsNotification;
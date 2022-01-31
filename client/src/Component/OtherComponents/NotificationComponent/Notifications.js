import { Snackbar, LinearProgress, Alert, Box, Slide } from '@mui/material';
import { Fragment, useEffect, useState } from "react";

const CustomNotification = ({ uopen, usetOpen }) => {
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
                    <Alert severity={uopen.type} sx={{ width: '100%' }}>
                        {uopen.message}
                    </Alert>
                    <Progress />
                </Box>
            }

        </Snackbar>
    )
}

export default CustomNotification;
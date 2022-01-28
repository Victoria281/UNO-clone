import { Snackbar, LinearProgress, Alert, Box, Slide } from '@mui/material';
import { useState, useEffect } from 'react';

const CustomNotification = ({ notif, setNotif }) => {

    const [progress, setProgress] = useState(0);

    function handleClose() {
        console.log("Snackbar Closed")
        setNotif({open: false, type: 'secondary', message: ''});
    }

    function TransitionDown(props) {
        return <Slide {...props} direction="down"/>;
    }

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
        }, 500);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={notif.open}
            onClose={handleClose}
            autoHideDuration={5000}
            TransitionComponent={TransitionDown}
        >
             <Box sx={{ width: '100%'}}>   
                 <Alert onClose={handleClose} severity={notif.type} sx={{ width: '100%' }}>
                    {notif.message}
                </Alert>
                    <LinearProgress color={notif.type} sx={{ width: '100%' }} variant="determinate" value={progress} />
                </Box>
        </Snackbar>
    )
}

export default CustomNotification;
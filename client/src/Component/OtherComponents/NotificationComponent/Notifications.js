import { Snackbar, LinearProgress, Alert, Box, Slide } from '@mui/material';

const CustomNotification = ({ notif, setNotif }) => {

    function handleClose() {
        console.log("Snackbar Closed")
        setNotif({open: false, type: 'secondary', message: ''});
    }

    function TransitionDown(props) {
        return <Slide {...props} direction="down"/>;
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={notif.open}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={TransitionDown}
        >
            {notif.type === "success"
                ? <Box sx={{ width: '100%'}}>   
                 <Alert onClose={handleClose} severity={notif.type} sx={{ width: '100%' }}>
                    {notif.message}
                </Alert>
                    <LinearProgress color={notif.type} sx={{ width: '100%' }} />
                </Box>
                :
                <Box sx={{ width: '100%'}}>
                    <Alert onClose={handleClose} severity={notif.type} sx={{ width: '100%' }}>
                        {notif.message}
                    </Alert>
                    <LinearProgress color={notif.type} sx={{ width: '100%' }} />
                </Box>}
        </Snackbar>
    )
}

export default CustomNotification;
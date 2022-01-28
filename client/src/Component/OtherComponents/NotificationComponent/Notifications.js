import { Snackbar, LinearProgress, Alert, Box, Slide } from '@mui/material';
import { Fragment, useEffect, useState } from "react";

const CustomNotification = ({ open, setOpen }) => {

    function handleClose() {
        console.log("Snackbar Closed")
        setOpen({ open: false, type: 'secondary', message: '' });
    }

    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open.open}
            onClose={()=>{handleClose()}}
            autoHideDuration={1000}
            TransitionComponent={TransitionDown}
        >
            {
                open.open &&
                    <Box sx={{ width: '100%' }}>
                        <Alert onClose={()=>handleClose()} severity={open.type} sx={{ width: '100%' }}>
                            {open.message}
                        </Alert>
                        <LinearProgress color={open.type} sx={{ width: '100%' }} />
                    </Box>
            }

        </Snackbar>
    )
}

export default CustomNotification;
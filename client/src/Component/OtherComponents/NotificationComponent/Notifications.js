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

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={mopen || uopen.open}
            onClose={() => { handleClose() }}
            autoHideDuration={1000}
            TransitionComponent={TransitionDown}
        >
            {
                uopen.open &&
                <Box sx={{ width: '100%' }}>
                    <Alert severity={uopen.type} sx={{ width: '100%' }}>
                        {uopen.message}
                    </Alert>
                    <LinearProgress color={uopen.type} sx={{ width: '100%' }} />
                </Box>
            }

        </Snackbar>
    )
}

export default CustomNotification;
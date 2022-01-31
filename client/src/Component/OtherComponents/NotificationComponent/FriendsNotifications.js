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
                    <LinearProgress color={uopen.type} sx={{ width: '100%' }} />
                </Box>
            }

        </Snackbar>
    )
}

export default FriendsNotification;
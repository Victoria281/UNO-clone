import { Snackbar, LinearProgress, Alert, Box, Slide , Button} from '@mui/material';
import { Fragment, useEffect, useState } from "react";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import styles from './styles.module.css';
import { CompareArrows } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const MultiplayerNotification = ({ uopen, usetOpen, socket }) => {
    const [mopen, msetOpen] = useState(false)

    let history = useHistory();

    function moveToMulti(){
        handleClose();
        history.push('./multiplayer/' + socket)
    }

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
                            <Button color="inherit" size="small" className={styles.moveBtn} onClick={()=>{
                                moveToMulti()
                            }}>
                                <CompareArrowsIcon color='success'/>
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

export default MultiplayerNotification;
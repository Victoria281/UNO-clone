// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EndGameModal = ({ endGameModalOpen, setEndGameModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("closing")
        setOpen(false);
        setEndGameModalOpen(false)
    }
    const dispatch = useDispatch();

    return (
        <Modal
            open={(open || endGameModalOpen)}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <div>
                <p>End Game</p>

            </div>
        </Modal>
    );
}

export default EndGameModal;

// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    playCard,
} from "../../../store/action/singleplayer/game"
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

const SelectColorModal = ({ card, socket, selectColorModalOpen, setSelectColorModalOpen }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("closing")
        setOpen(false);
        setSelectColorModalOpen(false)
    }
    const dispatch = useDispatch();

    const handleSelectColor = (color) =>{
        console.log("not closing?")
        handleClose()
        dispatch(playCard(card, color));
    }
    return (
        <Modal
            open={(open || selectColorModalOpen) && card !== undefined}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <div> Select Color </div>
                <br />
                <br />
                <div>
                    <button
                        onClick={() => {
                            handleSelectColor("red")
                        }}
                    >
                        red
                    </button>

                    <button
                        onClick={() => {
                            handleSelectColor("blue")
                        }}
                    >
                        blue
                    </button>

                    <button
                        onClick={() => {
                            handleSelectColor("yellow")
                        }}
                    >
                        yellow
                    </button>

                    <button
                        onClick={() => {
                            handleSelectColor("green")
                        }}
                    >
                        green
                    </button>
                </div></>
        </Modal>
    );
}

export default SelectColorModal;

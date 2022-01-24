//@ts-nocheck
import React, { Fragment, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, Slide, Box, Modal, Button, MobileStepper, LinearProgress, Grid } from "@mui/material";
import styles from './styles.module.css';
import game from "../../img/game.png";
import SwipeableViews from 'react-swipeable-views';

const Tutorial = ({
    isTutorialOpen,
    setisTutorialOpen
}) => {
    const carouselItems = [
        {
            title: "Welcome to UNO!",
            description: `Here's a tutorial on how to play the game! Press the 'Start' button to proceed.`
        },
        {
            title: "Structure of the Game",
            image: game,
        },
        {
            title: "Playing a Card",
            image: game,
        },
        {
            title: "Drawing Cards",
            image: game,
        },
        {
            title: "Special cards",
            image: game,
        },
        {
            title: "Winning the Game",
            image: game,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [transition, setTransition] = useState(false);
    const maxSteps = carouselItems.length;
    const theme = useTheme();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const closeModal = () => {
        setActiveStep(0);
        setisTutorialOpen(false);
    }

    const TutorialCarousel = () => {
        return (
            <Fragment>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item md={12} className={`${styles.container} ${styles.primaryDiv}`}>
                            {/* {
                                        activeStep === 0 ?
                                        null
                                        : */}
                                <Typography variant="h4" className={styles.title}>{carouselItems[activeStep].title}</Typography>
                                
                            {/* } */}
                                </Grid>
                            <Grid item md={12} className={`${styles.container} ${styles.secondaryDiv}`}>
                                    {
                                        activeStep === 0 ?
                                 
                                          <Typography variant="h6" className={styles.description}>{carouselItems[activeStep].description}</Typography>
                                 
                                        : 
                                        <img src={carouselItems[activeStep].image} className={styles.image}></img>
                                    }         
                            </Grid>
                            <Grid item md={3} className={styles.container}>
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    className="px-3">
    
                                    {
                                        activeStep === 0
                                            ? null
                                            : <i className={`fa fa-caret-left ${styles.next}`}></i>
                                    }
    
                                </Button>
                            </Grid>
                            <Grid item md={6} className={styles.container}>
                                <LinearProgress variant="determinate" value={(activeStep / (maxSteps - 1)) * 100} color='warning' className={styles.progress} />
                            </Grid>
                            <Grid item md={3}  className={styles.container}>
                            {
                                activeStep === maxSteps - 1
                                    ? <Button onClick={closeModal} className={styles.startfinbtn}> Finish </Button>
                                    : <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                    >
    
                                        {activeStep === 0
                                            ? <Box className={styles.startfinbtn}> Start </Box>
                                            : <i className={`fa fa-caret-right ${styles.next}`}></i>
                                        }
                                    </Button>
                            }
                            </Grid>
                        </Grid>
                    </div>
            </Fragment>
        )
    }

    return (
        <Modal
            open={isTutorialOpen}
            onClose={closeModal}
            className={styles.tutorialModal}
        >
           <Slide direction="right" in={isTutorialOpen}>
                <Box className={styles.tutorialModalBox}>
                    <TutorialCarousel />
                </Box>
           </Slide>
        </Modal>
    );

}



export default Tutorial;
//@ts-nocheck
import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, Box, Modal, Button, MobileStepper, LinearProgress } from "@mui/material";
import styles from './styles.module.css';
import game from "../../img/game.png";
import SwipeableViews from 'react-swipeable-views';

const Tutorial = (
    isTutorialOpen
) => {
    const carouselItems = [
        {
            title: "Welcome to UNO!",
            description: `Here's a tutorial on how to play the game! Press the next button to proceed.`
        },
        {
            title: "Structure of the Game",
            image: game,
            description: `Each player will have 7 cards at the start of the game. At the center, there is a deck to draw cards from and a card facing up to place cards on  these will be the draw pile and discard pile respectively.`
        },
        {
            title: "Playing a Card",
            image: game,
            description: `A player can play a card from their hand that is the same Number, Colour and Type 
             as the card at the top of the discard pile. A wild card (black uno cards) can also be played to change the colour of the current card at the top of the discard pile. `
        },
        {
            title: "Drawing Cards",
            image: game,
            description: `If a player is unable to play any of their cards, the player has to draw a card from the draw pile. The player’s turn is then skipped. If the colour/number/type of the card matches that of the card on the discard pile, then the player can play that card. If not, the player’s turn ends. 
            `
        },
        {
            title: "Special cards",
            image: game,
            description:
                `Wild: Changes colour of current card on the discard pile 
             Skip : Skips the next player 
             Reverse : Changes the direction of play 
            +2 Draw: Causes next player to draw 2 cards and skip their turn 
            Wild +4 Draw : A combination of the +2 draw and wild card 
            `
        },
        {
            title: "Winning the Game",
            image: game,
            description: `Once a player has only one card left, they have to click on the UNO button to call UNO after they have placed their second last card. If another player calls UNO first, the player with only one card left has to draw 2 cards from the draw pile. The game is won once a player has no more cards left in their hand.
            `
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
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
        isTutorialOpen.setisTutorialOpen(false);
    }

    const TutorialItem = (item) => {
        return (
            <Box className="w-100 h-100 text-center">
                <h3 className={styles.title}> {item.item.title}</h3>

                <div className={`pb-4`}><img src={item.item.image} className={styles.image}></img></div>
            </Box>
        )
    }

    const TutorialCarousel = () => {
        return (
            <Box>
                {/* <Box
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        bgcolor: 'background.default',
                    }}
                >
                    <Typography>{carouselItems[activeStep].title}</Typography>
                </Box> */}
                {/* <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                > */}
                    <Box sx={{ height: 400, width: '100%' }}>
                        {
                            activeStep === 0 ?
                                <Box className="w-100 text-center">
                                    <h3 className={styles.title}> {carouselItems[activeStep].title}  </h3>
                                    <Typography> {carouselItems[activeStep].description} </Typography>
                                </Box> :
                                <TutorialItem item={carouselItems[activeStep]} />
                        }
                    </Box>
                {/* </SwipeableViews> */}
                <div className="d-flex justify-content-between">

                    <div>
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
                    </div>

                    <div className="d-flex align-items-center">
                        <LinearProgress variant="determinate" value={(activeStep / (maxSteps - 1)) * 100} sx={{ width: 450, p: 2 }} color={'warning'} className={styles.progress} />
                    </div>


                    <div>
                        {
                            activeStep === maxSteps - 1
                                ? <Button onClick={closeModal} className="bg-danger p-2 mr-4  text-light border border-dark rounded"> Finish </Button>
                                : <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >

                                    {activeStep === 0
                                        ? <Box className="bg-danger p-2 mr-4 text-light border border-dark rounded"> Start </Box>
                                        : <i className={`fa fa-caret-right ${styles.next}`}></i>
                                    }
                                </Button>
                        }
                    </div>
                </div>
            </Box>
        )
    }

    return (
        <div className={styles.tutorialModalDiv}>
            <Modal
                open={isTutorialOpen.isTutorial}
                onClose={closeModal}
            >
                <Box className={styles.tutorialModal}>
                    <TutorialCarousel />
                </Box>
            </Modal>
        </div>
    );

}



export default Tutorial;
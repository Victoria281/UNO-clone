//@ts-nocheck
import React, { useState } from "react";
import Modal from "react-modal";
import "../css/tutorial.css";
import game from "../img/game.png";

const Tutorial = (
   
    isTutorialOpen,
    setisTutorialOpen

) => {
  
    function closeModal (){
        console.log("hi");
    setisTutorialOpen(false);
    }

    return (
        <div className="tutorialModalDiv">
            <Modal
                isOpen={isTutorialOpen}
                onRequestClose={closeModal}
                className="tutorialModal"
            >
                {/* <div> <button onClick={()=> {setisTutorialOpen(false)}} className="closebtn">x</button></div> */}
                <div id="carouselExampleIndicators" className="carousel slide h-100">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner ">
                        <div className="carousel-item active">
                            <div className="carouselcontent">
                               <h3 className="title"> Welcome to NOU! </h3>
                               <p className="description"> Here's a tutorial on how to play the game. </p>
                            </div> 
                        </div>
                        <div className="carousel-item">
                            <div className="w-100 text-center">
                                <h3 className="title">Structure of the Game</h3>
                                
                                <div><img src={game} className="image"></img></div>

                                <p></p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-block w-100 text-light">Words3</div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </Modal>
        </div>
    );

}



export default Tutorial;
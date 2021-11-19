import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import shuffleCards from "../components/shuffle";
import "../css/end.css";
import axios from "axios";

import { useHistory } from "react-router-dom";
const End = (props) => {
  const [winner, setWinner] = useState("");
  const [cardsLeft, setCardsLeft] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
  });
  const [points, setPoints] = useState(0);
  console.log(props.location.state);
  const [gameresult, setGameResult] = useState(false);

  const [userScores, setuserScores] = useState([]);

  const EndGameScreen = () => (
    <div>
      <Modal isOpen={gameresult} className="gameScreen">
        <div className="row">
          <div className="col-3">
            <img
              className="trophy"
              // src={require("../pages/cards/trophy.png")}
            />
          </div>
          <div className="col-9">
            <div className="headerW">{winner} Won</div>
            <div className="actionsW">+{points} Points</div>
          </div>
        </div>

        <div className="row btns">
          <a
            className="RetryBtn"
            href="./game"
            onClick={() => {
              setGameResult(false);
            }}
          >
            <img
              className="logoStyle"
              // src={require("../pages/cards/retry.jpg")}
              alt="logo"
            ></img>
          </a>

          <a
            className="HomeBtn"
            href="./"
            onClick={() => {
              setGameResult(false);
            }}
          >
            <img
              className="logoStyle"
              // src={require("../pages/cards/home.png")}
              alt="logo"
            ></img>
          </a>
        </div>
      </Modal>
    </div>
  );

  const getWinner = () => {
    const players = props.location.state.players;
    var win = "";
    var tempPts = 0;
    for (var key in players) {
      if (players.hasOwnProperty(key)) {
        if (players[key].length === 0) {
          win = key;
        }
        cardsLeft[key] = players[key].length;
        tempPts += players[key].length * 10;
        console.log(key + " -> " + players[key].length);
      }
    }
    setCardsLeft(cardsLeft);
    setPoints(tempPts);
    setWinner(win);
    setGameResult(true);
  };

  // Insert New Score for Players
  const insertPlayerNewScore = async () => {
    try {
      const userid = localStorage.getItem('userid')
      const response = await fetch(
        `https://uno-clone.herokuapp.com/api/uno/leaderboard/insert/${userid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: points
          })
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update to highest Score for Players
  const updatePlayerHighestScore = async () => {
    try {
      const userid = localStorage.getItem('userid')
      const response = await fetch(
        `https://uno-clone.herokuapp.com/api/uno/leaderboard/update/${userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: points
          })
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Get All Current Player Score
  const retriveAllCurrentPlayerScore = async () => {
    try {
      const userid = localStorage.getItem('userid')
      const response = await fetch(
        `https://uno-clone.herokuapp.com/api/uno/leaderboard/user/${userid}`
        );
        const jsonData = await response.json();
        var userAllScores = jsonData.scores;
        setuserScores(userAllScores);
      } catch (err) {
        console.error(err.message);
      }
  };

  useEffect(() => {
    retriveAllCurrentPlayerScore();
    getWinner();
    // insertPlayerNewScore();
  }, [points]);

  return (
    <div className="container">
      <EndGameScreen />
    </div>
  );
};

export default End;

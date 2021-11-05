import React, { Fragment, useEffect, useState } from "react";

import shuffleCards from "../components/shuffle";
import "../styles.css";

import { useHistory } from "react-router-dom";
const End = () => {
  const [winner, setWinner] = useState("");
  const [cardsLeft, setCardsLeft] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
  });
  const [points, setPoints] = useState(0);
  console.log(props.location.state);
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
  };
  useEffect(() => {
    getWinner();
  }, []);
  return (
    <div className="container">
      <h1>Winner</h1>
      <p>{winner}</p>
      <h1>Points</h1>
      <p>{points}</p>
    </div>
  );
};

export default End;

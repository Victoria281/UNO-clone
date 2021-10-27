import React, { Fragment, useEffect, useState } from "react";

import "../styles.css";

const Game = () => {
  const [play, setPlay] = useState({
    player1: {
      id: 0,
      values: 0,
      color: 0,
      image_file: ""
    },
    player2: {
      id: 0,
      values: 0,
      color: 0,
      image_file: ""
    },
    player3: {
      id: 0,
      values: 0,
      color: 0,
      image_file: ""
    },
    player4: {
      id: 0,
      values: 0,
      color: 0,
      image_file: ""
    }
  });

  const botcard = (arr) => {
    var normal = arr.filter(
      (item) => item.color === current.color || item.values === current.values
    );
    var wild = arr.filter((item) => item.color === "wild");
  };
  const Player = ({ player }) => {
    return (
      <ul>
        {turn === 0 &&
          player.map((decks) => (
            <li key={decks.id}>
              <div
                onClick={() => {
                  playCard(decks, player);
                }}
              >
                <img
                  className="img-responsive"
                  src={decks.image_file}
                  alt={decks.values + " " + decks.color}
                />
                <p className="imageText">{decks.image_file}</p>
              </div>
            </li>
          ))}
        {turn !== 0 &&
          player.map((decks) => (
            <li key={decks.id}>
              <div>
                <p>{decks.values}</p>
                <p>{decks.color}</p>
              </div>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <div class="row">
        <div class="col-sm-3">
          <h5>Player 1</h5>
          <Player player={players.player1} type="human" />
        </div>
      </div>
    </div>
  );
};

export default Game;

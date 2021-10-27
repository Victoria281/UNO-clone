import React, { Fragment, useEffect, useState } from "react";

import "../styles.css";

const Game = () => {

  const botplay = (arr) => {
    console.log("Bot plays card");
    // console.log(arr);
    // console.log(current);
    var normal_playable = arr.filter(
      (item) => item.color === current.color || item.values === current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");

    console.log("Bot can play");
    console.log(normal_playable);
    console.log(wild_playable);

    var r = Math.random();
    var cardplayed = {};

    if (wild_playable.length !== 0 && normal_playable.length !== 0) {
      if (r < 0.75) {
        cardplayed =
          wild_playable[Math.floor(Math.random() * wild_playable.length)];
      } else {
        cardplayed =
          normal_playable[Math.floor(Math.random() * normal_playable.length)];
      }
      playCard(cardplayed, arr);
    } else if (wild_playable.length !== 0) {
      cardplayed =
        wild_playable[Math.floor(Math.random() * wild_playable.length)];
      playCard(cardplayed, arr);
    } else if (normal_playable.length !== 0) {
      cardplayed =
        normal_playable[Math.floor(Math.random() * normal_playable.length)];
      playCard(cardplayed, arr);
    } else {
      console.log("no card to play");
      // console.log(turn + 1);
      var expectedPlayerInd = order.indexOf(turn);
      expectedPlayerInd += 1;
      if (expectedPlayerInd === 4) {
        expectedPlayerInd = 0;
      } else if (expectedPlayerInd > 4) {
        expectedPlayerInd = Math.trunc(expectedPlayerInd / 4);
      }
      // console.log(order[expectedPlayerInd] + 1);
      setTurn(order[expectedPlayerInd]);
    }
  };
  const Bot = (arr) => {
    return (
      <ul>
        {arr.arr.map((decks) => (
          <li key={decks.id}>
            <div>
              <img
                className="img-responsive"
                src={decks.image_file}
                alt={decks.values + " " + decks.color}
              />
              <p className="imageText">{decks.image_file}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const getCards = async () => {
    console.log("retrieving cards");
    try {
      const response = await fetch("https://uno-clone.herokuapp.com/getall");
      const jsonData = await response.json();
      var cards_retrieved = jsonData.cards;
      setCards(cards_retrieved);
      // console.log("cardsretriev ");
      cards_retrieved = shuffleCards(cards_retrieved);
      var arr = dealCards(cards_retrieved);
      cards_retrieved = arr[1];
      setPlayers(arr[0]);
      console.log(cards_retrieved);
      setMainDeck(cards_retrieved.slice(1, cards_retrieved.length));
      setCurrent(cards_retrieved[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCards();
  }, []);
  useEffect(() => {
    console.log("Now is player " + (turn + 1) + " turn");
    if (
      players.player1.length === 0 ||
      players.player2.length === 0 ||
      players.player3.length === 0 ||
      players.player4.length === 0
    ) {
      console.log("ended");
    } else {
      if (turn !== 0) {
        botplay(players["player" + (turn + 1)]);
      }
    }
  }, [turn]);

  return (
    <div className="container">
      <div class="row">
        <div class="col-sm-3">
          <h5>Bot 1</h5>
          <Bot arr={players.player2} />
        </div>
        <div class="col-sm-3">
          <h5>Bot 2</h5>
          <Bot arr={players.player3} />
        </div>
        <div class="col-sm-3">
          <h5>Bot 3</h5>
          <Bot arr={players.player4} />
        </div>
      </div>

    </div>
  );
};

export default Game;

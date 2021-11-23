import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import shuffleCards from "../components/shuffle";
import "../index.css";
import "../css/card.css";

import {nextTurn, previousTurn} from "../components/nextPlayer";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [used, setUsed] = useState([]);
  const [current, setCurrent] = useState({
    id: 0,
    values: 0,
    color: "",
    image_file: ""
  });
  const [players, setPlayers] = useState({
    player1: [],
    player2: [],
    player3: [],
    player4: []
  });
  const [isUnoButtonPressed, setUnoButtonPressed] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [drawCard, setDrawCard] = useState(false);
  const [ifShow, setIfShow] = useState(false);
  const [ifDraw, setIfDraw] = useState(false);
  const [playedDraw, setPlayedDraw] = useState(false);
  const [turnModal, setTurnModal] = useState(false);
  const [order, setOrder] = useState([1, 2, 3, 4]);
  const [playable, setPlayable] = useState([]);
  const [turn, setTurn] = useState(0);

  const botplay = (arr) => {
    console.log("Bot is playing card ----------");
    var normal_playable = arr.filter(
      (item) => item.color === current.color || item.values === current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");
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
      console.log(cardplayed);

      playCard(cardplayed, arr);
    } else if (wild_playable.length !== 0) {
      cardplayed =
        wild_playable[Math.floor(Math.random() * wild_playable.length)];
      console.log(cardplayed);
      playCard(cardplayed, arr);
    } else if (normal_playable.length !== 0) {
      cardplayed =
        normal_playable[Math.floor(Math.random() * normal_playable.length)];
      console.log(cardplayed);
      playCard(cardplayed, arr);
    } else {
      console.log("Bot has no card to play");
      players["player" + order[turn]].push(mainDeck[0]);
      setMainDeck(mainDeck.slice(1, mainDeck.length));
      setTurn(nextTurn(turn));
    }
  };

  const Bot = (arr) => {
    return (
      <div class={"botcards" + arr.no}>
        {arr.arr.map((decks) => (
          <div class={"cards" + arr.no}>
            <img
              className="img-responsive allcards"
              src={"https://uno-clone.herokuapp.com/api/uno/images/Deck.png"}
              alt={decks.values + " " + decks.color}
            />
          </div>
        ))}
      </div>
    );
  };

  const Player = ({ player }) => {
    return (
      <div className="playercards">
        {order[turn] === 1 &&
          player.map((decks) => {
            return (
              <div className="pcards" key={decks.id}>
                {playable.includes(decks) && (
                  <div
                    onClick={() => {
                      playCard(decks, player);
                    }}
                  >
                    <img
                      className="img-responsive"
                      style={{ width: 80 }}
                      src={
                        "https://uno-clone.herokuapp.com/api/uno/images/" +
                        decks.image_file.slice(8)
                      }
                      alt={decks.values + " " + decks.color}
                    />
                    <p className="imageText">Yes</p>
                  </div>
                )}
                {!playable.includes(decks) && (
                  <div>
                    <img
                      className="img-responsive"
                      style={{ width: 80 }}
                      src={
                        "https://uno-clone.herokuapp.com/api/uno/images/" +
                        decks.image_file.slice(8)
                      }
                      alt={decks.values + " " + decks.color}
                    />
                    <p className="imageText">No</p>
                  </div>
                )}
              </div>
            );
          })}
        {order[turn] !== 1 &&
          player.map((decks) => (
            <div className="pcards" key={decks.id}>
              <div>
                <img
                  className="img-responsive"
                  style={{ width: 80 }}
                  src={
                    "https://uno-clone.herokuapp.com/api/uno/images/" +
                    decks.image_file.slice(8)
                  }
                  alt={decks.values + " " + decks.color}
                />
              </div>
            </div>
          ))}
      </div>
    );
  };

  const ChooseColorWild = () => {
    const changeColor = (clr) => {
      setSelectColor(false);
      current.color = clr;
      current.values = 15;
      if (drawCard === true) {
        setTurn(2);
      } else {
        setTurn(1);
      }
      setCurrent(current);
      setDrawCard(false);
    };
    return (
      <div>
        <Modal isOpen={selectColor} className="colorChoose">
          <div className="header"> Select Color </div>
          <br />
          <br />
          <div className="">
            <button
              className="RedBtn"
              onClick={() => {
                changeColor("red");
              }}
            >
              Color
            </button>

            <button
              className="BlueBtn"
              onClick={() => {
                changeColor("blue");
              }}
            >
              Color
            </button>

            <button
              className="YellowBtn"
              onClick={() => {
                changeColor("yellow");
              }}
            >
              Color
            </button>

            <button
              className="GreenBtn"
              onClick={() => {
                changeColor("green");
              }}
            >
              Color
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  const PlayerTurnModal = () => (
    <div>
      <Modal isOpen={turnModal} className="playerTurn">
        <div className="playerHeader">Card Now is:</div>
        <img
          className="img-responsive"
          style={{ width: 90 }}
          src={
            "https://uno-clone.herokuapp.com/api/uno/images/" +
            current.image_file.slice(8)
          }
        ></img>

        <div className="playerHeader">Player {order[turn]} Turn</div>
      </Modal>
    </div>
  );

  const AddCardModal = () => {
    return (
      <div>
        <Modal isOpen={playedDraw} className="drawCard">
          <div className="drawHeader">Player {order[nextTurn(turn)]}</div>
          <div className="drawHeader2">Draw Card</div>
        </Modal>
      </div>
    );
  };

  const modalOpen = () => {
    setTurnModal(true);
    setTimeout(() => {
      setTurnModal(false);
    }, 3000);
    return true;
  };
  //Turn Modal Functions End

  const playCard = (cardInfo, player) => {
    console.log("A card was played by Player " + order[turn]);
    console.log("Current card is " + current.color + " " + current.values);
    console.log("Card played is " + cardInfo.color + " " + cardInfo.values);

    setIfShow(false);
    setIfDraw(false);
    used.push(current);
    setUsed(used);
    setCurrent(cardInfo);
    var player_new = player.filter((item) => item !== cardInfo);
    players["player" + order[turn]] = player_new;
    setPlayers(players);

    // To add 2 cards if player does not press "NUO"
    // Only for player1 as bot is not dumb
    if (players.player1.length === 0 && !isUnoButtonPressed) {
      for (var penalty2 = 0; penalty2 < 2; penalty2++) {
        players["player1"].push(mainDeck[penalty2]);
      }
      alert("You forgot to press NUO. 2 cards are drawn as penalty");
    }

    if (players["player" + order[turn]].length === 1) {
      var random = Math.random();
      if (random < 0.8) {
        alert("PlayerBot " + order[turn] + "pressed NOU");
      } else {
        for (var botpenalty = 0; botpenalty < 2; botpenalty++) {
          players["player" + order[turn]].push(mainDeck[botpenalty]);
        }
        setMainDeck(mainDeck.slice(2, mainDeck.length));
        setPlayers(players);
        alert("Bot forgot to press NUO. 2 cards are drawn as penalty");
      }
    }
    // switch ("14") {
    switch (cardInfo.values) {
      //skip is 10
      case "10":
        console.log("skipped played----");
        var skippedPlayer = nextTurn(turn);
        console.log("Player " + order[skippedPlayer] + " got skipped");
        setTurn(nextTurn(skippedPlayer));
        break;

      //reverse is 11
      case "11":
        console.log("reverse is played----");
        var newOrder = [order[2], order[1], order[0], order[3]];
        var reverseplayerIndex = newOrder.indexOf(order[turn]);
        console.log("New Order" + newOrder);
        console.log("Old Order" + order);
        console.log("This is the old order " + order);
        console.log(
          "The player who played reverse is " +
            order[turn] +
            " at turn is " +
            turn
        );
        console.log(
          "The same player should be " +
            newOrder[reverseplayerIndex] +
            " at this turn is " +
            reverseplayerIndex
        );
        console.log(
          "The next player should be " +
            newOrder[nextTurn(reverseplayerIndex)] +
            " at new turn is " +
            nextTurn(reverseplayerIndex)
        );

        setOrder(newOrder);
        setTurn(nextTurn(reverseplayerIndex));
        console.log("why handddd");
        break;

      //+2 draw is 12
      case "12":
        console.log("draw 2 played----");
        var drawCardPlayer = nextTurn(turn);
        for (var draw2 = 0; draw2 < 2; draw2++) {
          players["player" + order[drawCardPlayer]].push(mainDeck[draw2]);
        }
        setMainDeck(mainDeck.slice(2, mainDeck.length));
        setPlayers(players);

        setPlayedDraw(true);
        setTimeout(() => {
          setPlayedDraw(false);
          setTurn(nextTurn(drawCardPlayer));
        }, 1500);
        break;

      //wild is 13
      case "13":
        console.log("select color played----");
        // To Choose Colour
        if (order[turn] === 1) {
          setSelectColor(true);
        } else {
          var color = ["red", "blue", "yellow", "green"];
          var num = Math.floor(Math.random() * 4);
          current.color = color[num];
          current.values = 15;
          setCurrent(current);
          setTurn(nextTurn(turn));
        }

        break;

      //+4 is 14
      case "14":
        console.log("draw 4 played----");
        var draw4CardPlayer = nextTurn(turn);
        for (var draw4 = 0; draw4 < 4; draw4++) {
          players["player" + order[draw4CardPlayer]].push(mainDeck[draw4]);
        }
        setMainDeck(mainDeck.slice(4, mainDeck.length));
        setPlayers(players);
        // To Choose Colour

        if (order[turn] === 1) {
          setPlayedDraw(true);
          setDrawCard(true);
          setTimeout(() => {
            setPlayedDraw(false);
            setSelectColor(true);
          }, 1500);
        } else {
          var color4 = ["red", "blue", "yellow", "green"];
          var n4um = Math.floor(Math.random() * 4);
          current.color = color4[n4um];
          current.values = 15;
          setCurrent(current);
          setPlayedDraw(true);
          setTimeout(() => {
            setPlayedDraw(false);
            setTurn(nextTurn(draw4CardPlayer));
          }, 1500);
        }
        break;

      default:
        console.log("normal card played----");
        setTurn(nextTurn(turn));
        break;
    }
    console.log("here");
    return;
  };

  const playFirstCard = (firstcard, mdeck, firstPlayerDeck) => {
    console.log("firstcard");
    console.log(firstcard.values);
    console.log(firstcard.color);
    switch (firstcard.values) {
      //skip is 10
      case "10":
        console.log("first card skipped played----");
        console.log("Player 1 got skipped");
        setTurn(1);
        break;

      //reverse is 11
      case "11":
        console.log("first card reverse played----");
        var fnewOrder = [order[2], order[1], order[0], order[3]];
        setOrder(fnewOrder);
        setTurn(3);
        break;

      //+2 draw is 12
      case "12":
        console.log("first card draw 2 played----");
        for (var fdraw2 = 0; fdraw2 < 2; fdraw2++) {
          firstPlayerDeck["player1"].push(mdeck[fdraw2]);
        }
        setMainDeck(mdeck.slice(2, mdeck.length));
        setPlayers(firstPlayerDeck);

        setPlayedDraw(true);
        setTimeout(() => {
          setPlayedDraw(false);
          setTurn(1);
        }, 1500);
        break;

      //wild is 13
      case "13":
        console.log("first card select color played----");
        // To Choose Colour

        var fcolor = ["red", "blue", "yellow", "green"];
        var fnum = Math.floor(Math.random() * 4);
        current.color = fcolor[fnum];
        current.values = 15;
        setCurrent(current);
        setTurn(0);

        break;

      //+4 is 14
      case "14":
        console.log("first card draw 4 played----");
        for (var fdraw4 = 0; fdraw4 < 4; fdraw4++) {
          firstPlayerDeck["player1"].push(mdeck[fdraw4]);
        }
        setMainDeck(mdeck.slice(4, mdeck.length));
        setPlayers(firstPlayerDeck);
        // To Choose Colour

        var fcolor4 = ["red", "blue", "yellow", "green"];
        var fn4um = Math.floor(Math.random() * 4);
        current.color = fcolor4[fn4um];
        current.values = 15;
        setCurrent(current);
        setPlayedDraw(true);
        setTimeout(() => {
          setPlayedDraw(false);
          setTurn(1);
        }, 1500);

        break;
      default:
        console.log("first normal card played----");
        break;
    }
  };
  
  const dealCards = (cardarray) => {
    var dealplayers = {
      player1: [],
      player2: [],
      player3: [],
      player4: []
    };
    for (var start = 0; start < 8; start++) {
      dealplayers.player1.push(cardarray[0]);
      dealplayers.player2.push(cardarray[1]);
      dealplayers.player3.push(cardarray[2]);
      dealplayers.player4.push(cardarray[3]);
      cardarray = cardarray.slice(4, cardarray.length);
    }
    var player1playable = dealplayers.player1.filter(
      (item) =>
        item.color === cardarray[0].color ||
        item.values === cardarray[0].values ||
        item.color === "wild"
    );
    console.log("Dealt Cards...");
    return [dealplayers, cardarray, player1playable];
  };

  const getCards = async () => {
    try {
      const response = await fetch(
        "https://uno-clone.herokuapp.com/api/uno/cards"
      );
      const jsonData = await response.json();
      var cards_retrieved = jsonData.cards;
      console.log("Retrieved Cards...");
      setCards(cards_retrieved);
      cards_retrieved = shuffleCards(cards_retrieved);
      var arr = dealCards(cards_retrieved);
      cards_retrieved = arr[1];
      setPlayable(arr[2]);
      setPlayers(arr[0]);
      setCurrent(cards_retrieved[0]);
      setMainDeck(cards_retrieved.slice(1, cards_retrieved.length));
      playFirstCard(
        cards_retrieved[0],
        cards_retrieved.slice(1, cards_retrieved.length),
        arr[0]
      );
      console.log("Set Up Game...");
    } catch (err) {
      console.error(err.message);
    }
  };

  const MainDeck = () => {
    const drawCards = () => {
      if (mainDeck.length === 1) {
        setMainDeck(shuffleCards(used));
        setUsed([]);
      }
      var drawnCard = mainDeck[0];
      players["player" + order[turn]].push(drawnCard);
      setMainDeck(mainDeck.slice(1, mainDeck.length));
      setPlayers(players);
      if (
        drawnCard.color === current.color ||
        drawnCard.values === current.values ||
        drawnCard.color === "wild"
      ) {
        playable.push(drawnCard);
        setPlayable(playable);
      }
      setIfShow(true);
      setIfDraw(true);
    };

    const PassTurn = () => {
      if (order[turn] !== 1) {
        return (
          <button className="nextbtn" style={{ background: "black" }}>
            <p>Skip?</p>
          </button>
        );
      } else {
        return (
          <button
            className="nextbtn"
            style={{ background: "#6C01AD" }}
            onClick={() => {
              setTurn(nextTurn(turn));
              setIfShow(false);
              setIfDraw(false);
            }}
          >
            <p>Skip?</p>
          </button>
        );
      }
    };

    return (
      <div className="maindeck">
        <div>
          <input
            type="image"
            disabled={ifDraw}
            className="deck"
            src={"https://uno-clone.herokuapp.com/api/uno/images/Deck.png"}
            style={{ width: 90 }}
            onClick={drawCards}
          ></input>
        </div>
        <div className="m-auto skipBtn">
          <PassTurn />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getCards();
  }, []);
  useEffect(() => {
    console.log("Turn changed");
    console.log(turn);
    console.log(current.image_file.slice(8));
    console.log(current.image_file);
    console.log("player " + order[turn] + " turn --------");
    if (
      (players.player1.length === 0 ||
        players.player2.length === 0 ||
        players.player3.length === 0 ||
        players.player4.length === 0) &&
      (mainDeck.length > 0 || used > 0)
    ) {
      console.log("game ends");
    } else {
      if (order[turn] !== 1) {
        console.log("the order now is " + order);
        console.log("Its player " + order[turn]);
        setTurnModal(true);
        setTimeout(() => {
          setTurnModal(false);
          setTimeout(() => {
            botplay(players["player" + order[turn]]);
          }, 2000);
        }, 1500);
      } else {
        modalOpen();
        var playable = players.player1.filter(
          (item) =>
            item.color === current.color ||
            item.values === current.values ||
            item.color === "wild"
        );

        console.log("the order now is " + order);
        console.log("Its my turn -------------");
        console.log("---------------------------------------");
        console.log("---------------------------------------");
        console.log("---------------------------------------");
        console.log("Current card is " + current.color + " " + current.values);
        console.log("The cards i can play is ");
        console.log(playable);
        setPlayable(playable);
      }
    }
  }, [turn]);

  return (
    <div class="gamePage">
      <ChooseColorWild />
      <PlayerTurnModal />
      <AddCardModal />

      <div className="row my-3">
        <div className="col-2 p-0" id="bot-left">
          <Bot arr={players.player2} no={"left"} />
        </div>

        <div className="col-8">
          <div className="row my-3 p-0">
            <Bot arr={players.player3} no={["top"]} />
          </div>

          <div className="row" id="middle">
            <div className="col-5 currentcards">
              <img
                className="img-responsive currentcard"
                style={{ width: 90 }}
                src={
                  "https://uno-clone.herokuapp.com/api/uno/images/" +
                  current.image_file.slice(8)
                }
              ></img>


            </div>
            <div className="col-5">
              <MainDeck />
            </div>
            <div className="col-2 gamecolorNow" style={{ backgroundColor: current.color, color: current.color }}>co</div>
          </div>
        </div>

        <div className="col-2 p-0">
          <Bot arr={players.player4} no={"right"} />
        </div>
      </div>
      <div className="row my-3 p-0 bottomRow">
        <div class="col-3"></div>
        <div class="col-6">
          <Player player={players.player1} type="human" />
        </div>
        <div class="col-3">
          <button
            className="nouBtn"
            onClick={() => {
              if (players.player1.length === 1) {
                setUnoButtonPressed(!isUnoButtonPressed);
                alert("Nuo has been pressed! You have 1 card remaining!");
              }
            }}
          >
            <p>NOU!</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;

import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import shuffleCards from "../components/shuffle";
import "../index.css";
import "../css/card.css";
import { useHistory } from "react-router-dom";
// const images = importAll(require.context('../cards', false, '/\.png/'));

// function importAll(r) {
//   let images = {};
//   r.keys().map(item => { images[item.replace('./', '')] = r(item); });
//   return images;
// }

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
  // const [order, setOrder] = useState(shuffleCards([0, 1, 2, 3]));
  const [isUnoButtonPressed, setUnoButtonPressed] = useState(false);
  const [selectColor, setSelectColor] = useState(false);
  const [ifShow, setIfShow] = useState(false);
  const [ifDraw, setIfDraw] = useState(false);
  const [playedDraw, setPlayedDraw] = useState(false);
  const [turnModal, setTurnModal] = useState(false);
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [playable, setPlayable] = useState([]);
  const [turn, setTurn] = useState(order[0]);
  const [play, setPlay] = useState({
    player1: {
      id: 0,
      values: 0,
      color: "",
      image_file: ""
    },
    player2: {
      id: 0,
      values: 0,
      color: "",
      image_file: ""
    },
    player3: {
      id: 0,
      values: 0,
      color: "",
      image_file: ""
    },
    player4: {
      id: 0,
      values: 0,
      color: "",
      image_file: ""
    }
  });

  const botplay = (arr) => {
    // console.log("Bot plays card");
    // console.log(arr);
    // console.log(current);

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
      console.log(turn);
      // console.log(turn + 1);
      var expectedPlayerInd = order.indexOf(turn);

      players["player" + (turn + 1)].push(mainDeck[0]);
      setMainDeck(mainDeck.slice(1, mainDeck.length));
      setPlayers(players);
      console.log("player" + (turn + 1) + "added a card");

      expectedPlayerInd += 1;
      if (expectedPlayerInd === 4) {
        expectedPlayerInd = 0;
      } else if (expectedPlayerInd > 4) {
        expectedPlayerInd = Math.trunc(expectedPlayerInd / 4);
      }

      setTurn(order[expectedPlayerInd]);
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
        {turn === 0 &&
          player.map((decks) => {
            console.log(playable.includes(decks));
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
                      src={"https://uno-clone.herokuapp.com/api/uno/images/" + decks.image_file.slice(8)}
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
                      src={"https://uno-clone.herokuapp.com/api/uno/images/" + decks.image_file.slice(8)}
                      alt={decks.values + " " + decks.color}
                    />
                    <p className="imageText">No</p>
                  </div>
                )}
              </div>
            );
          })}
        {turn !== 0 &&
          player.map((decks) => (
            <div className="pcards" key={decks.id}>
              <div>
                <img
                  className="img-responsive"
                  style={{ width: 80 }}
                  src={"https://uno-clone.herokuapp.com/api/uno/images/" + decks.image_file.slice(8)}
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
      setCurrent(current);
      setTurn(order[1]);
    }
    return (
      <div>
        <Modal isOpen={selectColor} className="colorChoose">
          <div className="header"> Select Color </div><br /><br />
          <div className="">
            <button
              className="RedBtn"
              onClick={() => { changeColor('red') }}
            >
              Color
            </button>

            <button
              className="BlueBtn"
              onClick={() => { changeColor('blue') }}

            >
              Color
            </button>

            <button
              className="YellowBtn" onClick={() => { changeColor('yellow') }}

            >
              Color
            </button>

            <button
              className="GreenBtn"
              onClick={() => { changeColor('green') }}

            >
              Color
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  const PlayerTurnModal = () => (
    <div>
      <Modal isOpen={turnModal} className="playerTurn">
        <div className="playerHeader">Card Played:</div>
        <img
          className="img-responsive"
          style={{ width: 90 }}
          src={"https://uno-clone.herokuapp.com/api/uno/images/" + current.image_file.slice(8)}></img>

        <div className="playerHeader">Player {turn + 1} Turn</div>
      </Modal>
    </div>
  );

  const AddCardModal = () => {
    var ind = order.indexOf(turn);
    ind += 1;
    if (ind === 4) {
      ind = 0;
    } else if (ind > 4) {
      ind = Math.trunc(ind / 4);
    }
    return (
      <div>
        <Modal isOpen={playedDraw} className="drawCard">
          <div className="drawHeader">Player {(order[ind] + 1)}</div>
          <div className="drawHeader2">Draw Card</div>
        </Modal>
      </div>
    );
  }

  const modalOpen = () => {
    console.log("Modal Open----------");
    setTurnModal(true);
    setTimeout(() => {
      console.log("Modal Close---------");
      setTurnModal(false);
    }, 3000);
    return true;
  };
  //Turn Modal Functions End

  const playCard = (cardInfo, player) => {
    // console.log("played card");
    // console.log(cardInfo);
    // console.log(player);
    setIfShow(false);
    setIfDraw(false);
    used.push(current);
    setUsed(used);
    setCurrent(cardInfo);
    var player_new = player.filter((item) => item !== cardInfo);
    players["player" + (turn + 1)] = player_new;
    // console.log(player_new);
    // console.log(players["player" + turn]);
    setPlayers(players);
    play["player" + (turn + 1)] = cardInfo;
    setPlay(play);

    // console.log("current player " + (turn + 1));
    var expectedPlayerInd = order.indexOf(turn);
    expectedPlayerInd += 1;
    if (expectedPlayerInd === 4) {
      expectedPlayerInd = 0;
    } else if (expectedPlayerInd > 4) {
      expectedPlayerInd = Math.trunc(expectedPlayerInd / 4);
    }
    // console.log("next player " + (order[expectedPlayerInd] + 1));

    // To add 2 cards if player does not press "NUO"
    // Only for player1 as bot is not dumb 
    if (players.player1.length === 0 && !isUnoButtonPressed) {
      for (var penalty2 = 0; penalty2 < 2; penalty2++) {
        players["player1"].push(mainDeck[penalty2]);
      }
      alert("You forgot to press NUO. 2 cards are drawn as penalty");
    }

    if (players["player" + (turn + 1)].length === 1) {
      console.log("bot has only" + players["player" + (turn + 1)][0] + " last card left");
      var random = Math.random();
      if (random < 0.8) {
        console.log("NOU called");
        alert("PlayerBot " + (turn + 1) + "pressed NOU");
      } else {
        for (var penalty2 = 0; penalty2 < 2; penalty2++) {
          players["player" + (turn + 1)].push(mainDeck[penalty2]);
        }
        setMainDeck(mainDeck.slice(2, mainDeck.length));
        setPlayers(players);
        alert("Bot forgot to press NUO. 2 cards are drawn as penalty");
      }
    }


    switch (cardInfo.values) {
      //skip is 10
      case "10":
        // console.log("skip called");
        // console.log(turn);
        // console.log(order.indexOf(turn));
        var currentplayerIndex = order.indexOf(turn);
        currentplayerIndex += 2;
        if (currentplayerIndex === 4) {
          currentplayerIndex = 0;
        } else if (currentplayerIndex > 4) {
          currentplayerIndex = Math.trunc(currentplayerIndex / 4);
        }

        play["player" + (order[currentplayerIndex] - 2)] = {
          id: 0,
          values: 0,
          color: 0,
          image_file: ""
        };
        setPlay(play);
        setTurn(order[currentplayerIndex]);
        // console.log(turn);
        // console.log("skip ended");
        break;

      //reverse is 11
      case "11":
        // console.log("reverse called");
        var newOrder = [order[3], order[2], order[1], order[0]];
        var reverseplayerIndex = newOrder.indexOf(turn);
        reverseplayerIndex += 1;
        if (reverseplayerIndex === 4) {
          reverseplayerIndex = 0;
        } else if (reverseplayerIndex > 4) {
          reverseplayerIndex = Math.trunc(reverseplayerIndex / 4);
        }

        // console.log(
        //   "reverse next player " + (newOrder[reverseplayerIndex] + 1)
        // );
        setOrder(newOrder);
        setTurn(newOrder[reverseplayerIndex]);
        // console.log("reverse ended");

        break;

      //+2 draw is 12
      case "12":
        // console.log("draw 2 called");
        for (var draw2 = 0; draw2 < 2; draw2++) {
          players["player" + (order[expectedPlayerInd] + 1)].push(
            mainDeck[draw2]
          );
        }
        setMainDeck(mainDeck.slice(2, mainDeck.length));
        setPlayers(players);
        // console.log("draw 2 ended");

        setPlayedDraw(true);
        setTimeout(() => {
          setPlayedDraw(false);
          setTurn(order[expectedPlayerInd]);
        }, 1500);
        break;

      //wild is 13
      case "13":
        // console.log("wild called");
        // To Choose Colour
        if (expectedPlayerInd === 1) {
          setSelectColor(true);
        } else {
          var color = ["red", "blue", "yellow", "green"];
          var num = Math.floor(Math.random() * (4 + 1));
          current.color = color[num];
          setCurrent(current);
          setTurn(order[expectedPlayerInd]);
        }
        // console.log("wild ended");

        break;

      //+4 is 14
      case "14":
        // console.log("draw 4 called");
        for (var draw4 = 0; draw4 < 4; draw4++) {
          players["player" + (order[expectedPlayerInd] + 1)].push(
            mainDeck[draw4]
          );
        }
        setMainDeck(mainDeck.slice(4, mainDeck.length));
        setPlayers(players);
        // To Choose Colour

        if (expectedPlayerInd === 1) {
          setPlayedDraw(true);
          setTimeout(() => {
            setPlayedDraw(false);
            setSelectColor(true);
          }, 1500);
          
        } else {
          var color4 = ["red", "blue", "yellow", "green"];
          var n4um = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
          current.color = color4[n4um];
          setCurrent(current);
          setPlayedDraw(true);
          setTimeout(() => {
            setPlayedDraw(false);
            setTurn(order[expectedPlayerInd]);
          }, 1500);
        }
        // console.log("draw 4 ended");
        break;

      default:
        // console.log("default called");
        // console.log(turn);
        // console.log(expectedPlayerInd);
        setTurn(order[expectedPlayerInd]);
        // console.log(turn);
        // console.log("default ended");
        break;
    }

    return player;
  };

  const dealCards = (cardarray) => {
    // console.log("dealing cards");
    // console.log(cardarray);
    var dealplayers = {
      player1: [],
      player2: [],
      player3: [],
      player4: []
    };
    for (var start = 0; start < 1; start++) {
      dealplayers.player1.push(cardarray[0]);
      dealplayers.player2.push(cardarray[1]);
      dealplayers.player3.push(cardarray[2]);
      dealplayers.player4.push(cardarray[3]);
      cardarray = cardarray.slice(4, cardarray.length);
    }
    // console.log(dealplayers.player1);
    var player1playable = dealplayers.player1.filter(
      (item) =>
        item.color === cardarray[0].color ||
        item.values === cardarray[0].values ||
        item.color === "wild"
    );
    // console.log(player1playable);

    // console.log("dealt cards");
    // console.log(cardarray);
    return [dealplayers, cardarray, player1playable];
  };

  const getCards = async () => {
    // console.log("retrieving cards");
    try {
      const response = await fetch("https://uno-clone.herokuapp.com/api/uno/cards");
      const jsonData = await response.json();
      var cards_retrieved = jsonData.cards;
      setCards(cards_retrieved);
      // console.log("cardsretriev ");
      cards_retrieved = shuffleCards(cards_retrieved);
      var arr = dealCards(cards_retrieved);
      cards_retrieved = arr[1];
      // console.log(arr[2]);
      // console.log("tp[[[[[[[");
      setPlayable(arr[2]);
      setPlayers(arr[0]);
      setCurrent(cards_retrieved[0]);
      setMainDeck(cards_retrieved.slice(1, cards_retrieved.length));
    } catch (err) {
      console.error(err.message);
    }
  };

  const MainDeck = () => {
    // console.log("main");
    const drawCards = () => {
      // console.log("drawing cards");
      if (mainDeck.length === 1) {
        // console.log("no more cards");
        setMainDeck(shuffleCards(used));
        setUsed([]);
      } else {
        setMainDeck(mainDeck.filter((item) => item !== mainDeck[0]));
      }
      var drawnCard = mainDeck[0];
      players["player" + (turn + 1)].push(drawnCard);
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
      if (turn !== 0) {
        return (
          <button
            className="nextbtn"
            style={{ background: 'black' }}
          >
            <p>Skip?</p>
          </button>
        )
      } else {
        return (
          <button
            className="nextbtn"
            style={{ background: '#6C01AD' }}
            onClick={() => {
              setTurn(turn + 1);
              setIfShow(false);
              setIfDraw(false);
            }}
          >
            <p>Skip?</p>
          </button>
        )
      }
    }

    return (
      <div className="maindeck">
        <div>
          <input type="image" disabled={ifDraw} className="deck" src={"https://uno-clone.herokuapp.com/api/uno/images/Deck.png"} style={{ width: 90 }} onClick={drawCards}></input>
        </div>
        <div className="m-auto skipBtn"><PassTurn />
        </div>
      </div>
    );
  };

  let history = useHistory();
  useEffect(() => {
    getCards();
  }, []);
  useEffect(() => {
    // console.log("Now is player " + (turn + 1) + " turn");
    if (
      (players.player1.length === 0 ||
        players.player2.length === 0 ||
        players.player3.length === 0 ||
        players.player4.length === 0) &&
      (mainDeck.length > 0 || used > 0)
    ) {
      // console.log("HERERERERERERERER");
      // console.log("SOMEONEEEEEEENDEDDDD");
      history.push({
        pathname: "/end",
        state: {
          players: players
        }
      });
    } else {
      console.log("Before Each Turn----------------------");

      if (turn !== 0) {
        setTurnModal(true);
        setTimeout(() => {
          setTurnModal(false);
          setTimeout(() => {
            botplay(players["player" + (turn + 1)]);
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

            <div className="col-6 currentcards">
              <img
                className="img-responsive currentcard"
                style={{ width: 90 }}
                src={"https://uno-clone.herokuapp.com/api/uno/images/" + current.image_file.slice(8)}></img>
            </div>
            <div className="col-5" >
              <MainDeck />
            </div>
            <div className="col-1" >
              {current.color}
            </div>


          </div>


        </div>

        <div className="col-2 p-0">
          <Bot arr={players.player4} no={"right"} />
        </div>
      </div>
      <div className="row my-3 p-0 bottomRow">
        <div class="col-3">

        </div>
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
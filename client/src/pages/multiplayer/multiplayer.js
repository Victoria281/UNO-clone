// @ts-nocheck
import { decrypting, encrypting } from "../../crypto";
import { secure_action } from "../../store/action/action";
import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import shuffleCards from "../../components/shuffle";
import "../../css/multi.css"
import ProfileIcon from "../../icons/profile.png"
import ChatIcon from "../../icons/chatLogo.png"

//gets the data from the action object and reducers defined earlier
const MultiPlayer = ({ username, roomname, socket }) => {
  const [whoami, setWhoami] = useState();
  const [usersInRoom, setUsersInRoom] = useState();
  const [, setCards] = useState([]);
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
    player2: []
  });
  const [unoBtn, setUnoBtn] = useState([false, false]);
  const [selectColor, setSelectColor] = useState(false);
  const [p1Playable, setP1Playable] = useState([]);
  const [p2Playable, setP2Playable] = useState([]);
  const [, setIfShow] = useState(false);
  const [ifDraw, setIfDraw] = useState(false);
  const [drawCard, setDrawCard] = useState(false);
  const [turn, setTurn] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);

  const [textingMsg, setTextingMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(secure_action(encrypt, msg, cipher));
  };



  const sendData = () => {
    if (textingMsg !== "") {
      console.log(textingMsg);
      socket.emit("chat", encrypting(textingMsg));
      setTextingMsg("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const nextTurn = (turn) => {
    var nextPlyer = turn + 1;
    if (nextPlyer === 3) {
      nextPlyer = 1;
    }
    return nextPlyer;
  };


  const Player = ({ player, type, identity }) => {
    // console.log(identity)
    // console.log(type)
    // console.log(identity === type)
    // console.log("here")
    var playable;
    if (type === 1) {
      playable = p1Playable;
    } else {
      playable = p2Playable;
    }


    if (identity === type) {
      return (
        <div className="player1cards">
          {turn === type &&
            player.map((decks) => {
              return (
                <div className="p1cards" key={decks.id}>
                  {playable.includes(decks) && (
                    <div
                      onClick={() => {
                        playCard(decks, player);
                      }}
                    >
                      <img
                        className="img-responsive isplayable"
                        style={{ width: 70 }}
                        src={
                          process.env.REACT_APP_API_URL + "/api/uno/images/" +
                          decks.image_file.slice(8)
                        }
                        alt={decks.values + " " + decks.color}
                      />
                    </div>
                  )}
                  {!playable.includes(decks) && (
                    <div>
                      <img
                        className="img-responsive"
                        style={{ width: 70 }}
                        src={
                          process.env.REACT_APP_API_URL + "/api/uno/images/" +
                          decks.image_file.slice(8)
                        }
                        alt={decks.values + " " + decks.color}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          {turn !== type &&
            player.map((decks) => (
              <div className="p1cards" key={decks.id}>
                <div>
                  <img
                    className="img-responsive"
                    style={{ width: 70 }}
                    src={
                      process.env.REACT_APP_API_URL + "/api/uno/images/" +
                      decks.image_file.slice(8)
                    }
                    alt={decks.values + " " + decks.color}
                  />
                </div>
              </div>
            ))}


        </div>
      );
    } else {

      return (
        <div className="player2cards">
          {player.map((decks) => (
            <div className="p2cards">
              <img
                style={{ width: 70 }}
                className="img-responsive allcards"
                src={process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"}
                alt={decks.values + " " + decks.color}
              />
            </div>
          ))}
        </div>

      );
    }

  };

  const ChooseColorWild = () => {
    const changeColor = (clr) => {
      setSelectColor(false);
      current.color = clr;
      current.values = 15;
      current.image_file = './cards/Wild.png';
      var newturn = nextTurn(turn);
      var nmaindeck = mainDeck;

      if (drawCard === true) {
        var draw4CardPlayer = newturn;
        for (var draw4 = 0; draw4 < 4; draw4++) {
          players["player" + draw4CardPlayer].push(mainDeck[draw4]);
        }
        // console.log("The turn now is player" + turn);
        // console.log("PLayer" + draw4CardPlayer + "has to draw a card");
        nmaindeck = mainDeck.slice(4, mainDeck.length);
        current.image_file = './cards/Wild_Draw.png';
      }
      socket.emit('updateGameInfo', {
        mainDeck: nmaindeck,
        used: used,
        current: current,
        playerdeck: players,
        turn: newturn
      })

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

  const playCard = (cardInfo, player) => {
    // console.log("It is players " + turn + " turn");
    // console.log("Current card is " + current.color + " " + current.values);
    // console.log("Card played is " + cardInfo.color + " " + cardInfo.values);

    setIfShow(false);
    setIfDraw(false);
    used.push(current);

    var player_new = player.filter((item) => item !== cardInfo);
    players["player" + turn] = player_new;

    // To add 2 cards if player does not press "NUO"
    // Only for player1 as bot is not dumb

    if (players["player" + turn].length === 0 && unoBtn[turn - 1] !== true) {
      for (var penalty2 = 0; penalty2 < 2; penalty2++) {
        players["player" + turn].push(mainDeck[penalty2]);
      }
      alert("player" + turn + " forgot to press NUO. 2 cards are drawn as penalty");
    }

    var newturn = nextTurn(turn);
    var nmaindeck = mainDeck;
    switch (cardInfo.values) {
      //skip is 10
      case "10":
        // console.log("skipped played----");
        // console.log("Player " + turn + " got skipped");
        newturn = nextTurn(newturn);
        break;

      //reverse is 11
      case "11":
        // console.log("reverse is played----");
        // console.log("Its my turn again");

        break;

      //+2 draw is 12
      case "12":
        // console.log("draw 2 played----");
        var drawCardPlayer = newturn;
        for (var draw2 = 0; draw2 < 2; draw2++) {
          players["player" + drawCardPlayer].push(mainDeck[draw2]);
        }
        // console.log("The turn now is player" + turn);
        // console.log("PLayer" + drawCardPlayer + "has to draw a card");
        nmaindeck = mainDeck.slice(2, mainDeck.length);

        break;

      //wild is 13
      case "13":
        // console.log("select color played----");
        // To Choose Colour
        setPlayers(players);
        setSelectColor(true);


        break;

      //+4 is 14
      case "14":
        // console.log("draw 4 played----");

        // To Choose Colour
        setPlayers(players);
        setDrawCard(true)
        setSelectColor(true);

        break;

      default:
        // console.log("normal card played----");
        break;
    }

    if (cardInfo.values !== "13" && cardInfo.values !== "14") {
      socket.emit('updateGameInfo', {
        mainDeck: nmaindeck,
        used: used,
        current: cardInfo,
        playerdeck: players,
        turn: newturn
      })
    }


    // console.log("here");
    return;
  };




  const dealCards = (cardarray) => {
    var dealplayers = {
      player1: [],
      player2: [],
    };
    for (var start = 0; start < 7; start++) {
      dealplayers.player1.push(cardarray[0]);
      dealplayers.player2.push(cardarray[1]);
      cardarray = cardarray.slice(4, cardarray.length);
    }
    // console.log("Dealt Cards...");
    return [dealplayers, cardarray];
  };

  const PassTurn = ({ identity }) => {
    if (turn !== identity) {
      return (
        <button className="mnextbtn" style={{ background: "black" }}>
          <p>Skip?</p>
        </button>
      );
    } else {
      return (
        <button
          className="mnextbtn"
          style={{ background: "#6C01AD" }}
          onClick={() => {
            var nturn = nextTurn(turn);
            setIfShow(false);
            setIfDraw(false);
            socket.emit('updateGameInfo', {
              turn: nturn,
              playerdeck: players,
              current: current,
            })
          }}
        >
          <p>Skip?</p>
        </button>
      );
    }
  };

  const UnoButton = ({ identity }) => {
    if (turn !== identity) {
      return (
        <button style={{ background: "black" }}
          className="mnouBtn"
        >
          <p>NOU!</p>
        </button>
      );
    } else {
      return (
        <button
          className="mnouBtn"
          onClick={() => {
            if (players["player" + turn].length === 1) {
              var pressUnoBtn = unoBtn;
              pressUnoBtn[turn - 1] = true;
              alert("NOU has been pressed! Player " + turn + " have 1 card remaining!");
              socket.emit('updateGameInfo', {
                unoBtn: pressUnoBtn,
                playerdeck: players,
                current: current,

              })
            }

          }}
        >
          <p>NOU!</p>
        </button>
      );
    }
  };

  const MainDeck = ({ identity }) => {
    const drawCards = () => {
      var drawmaindeck = mainDeck
      var newused = used;
      if (drawmaindeck.length === 1) {
        drawmaindeck = (shuffleCards(used));
        newused = []
      }
      var drawnCard = drawmaindeck[0];
      players["player" + turn].push(drawnCard);
      drawmaindeck = drawmaindeck.slice(1, mainDeck.length);

      setIfShow(true);
      setIfDraw(true);

      socket.emit('updateGameInfo', {
        mainDeck: drawmaindeck,
        used: newused,
        playerdeck: players,
        current: current,
        turn: turn
      })
    };

    return (
      <div className="multimain">
        <div className="row no-gutters">
          {turn !== identity &&
          <input
            type="image"
            alt="DeckImg"
            disabled={ifDraw}
            className="col-8"
            src={process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"}
            style={{ width: 90 }}
          ></input>
  }
  {turn === identity &&
  <input
    type="image"
    disabled={ifDraw}
    alt="DeckImg"
    className="col-8"
    src={process.env.REACT_APP_API_URL + "/api/uno/images/Deck.png"}
    style={{ width: 90 }}
    onClick={drawCards}
  ></input>
}

          <div className="col-4">
            <div className="row no-gutters">
              <div className="colorNow" style={{ backgroundColor: current.color, color: current.color }}>color</div>
            </div>

          </div>
        </div>


      </div>
    );
  };

  useEffect(() => {
    socket.on("message", (data) => {
      var user = data.username;
      if (data.username === "system") {
        user = data.newuser;
      }
      const ans = decrypting(data.text, user);
      dispatchProcess(false, ans, data.text);
      // console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
    socket.on("test", (data) => {
      // console.log("it workedddd")
      // console.log(data)
    });

    socket.on("userNotFound", (data) => {
      alert("Unable to find User")
      window.location = "/";
    });

    socket.on("alreadyConnected", (data) => {
      alert(data.message)
      window.location = "/";
    });

    socket.on("tooMuchUsers", (data) => {
      alert("The room is full")
      window.location = "/";
    });

    socket.on("getUserPlayerNum", (data) => {
      // console.log("Received update to change player number")
      // console.log(data.users)
      for (var i = 0; i < data.users.length; i++) {
        // console.log(data.users[i])
        if (data.users[i].username === username) {
          setWhoami(data.users[i].playerNum);
          break
        }
      }
    });

    socket.on('startGame', ({ mainDeck, used, current, playerdeck, turn, usersInRoom }) => {
      setUsersInRoom(usersInRoom)
      // console.log("receveived start game info")
      // console.log(usersInRoom)

      if (turn === 1) {
        var player1playable = playerdeck.player1.filter(
          (item) =>
            item.color === current.color ||
            item.values === current.values ||
            item.color === "wild"
        );
        setP1Playable(player1playable)
        setP2Playable([])
      } else {
        var player2playable = playerdeck.player2.filter(
          (item) =>
            item.color === current.color ||
            item.values === current.values ||
            item.color === "wild"
        );
        setP2Playable(player2playable)
        setP1Playable([])
      }

      setMainDeck(mainDeck)
      setUsed(used)
      setCurrent(current)
      setPlayers(playerdeck)
      setTurn(turn)
    })

    socket.on('updateGameInfo', ({ mainDeck, used, current, playerdeck, turn, unoBtn }) => {
      console.log("receveived update game info")
      // console.log(mainDeck)

      if (turn === 1) {
        var player1playable = playerdeck.player1.filter(
          (item) =>
            item.color === current.color ||
            item.values === current.values ||
            item.color === "wild"
        );
        setP1Playable(player1playable)
        setP2Playable([])
      } else {
        var player2playable = playerdeck.player2.filter(
          (item) =>
            item.color === current.color ||
            item.values === current.values ||
            item.color === "wild"
        );
        setP2Playable(player2playable)
        setP1Playable([])
      }


      mainDeck && setMainDeck(mainDeck)
      used && setUsed(used)
      current && setCurrent(current)
      playerdeck && setPlayers(playerdeck)
      turn && setTurn(turn)
      unoBtn && setUnoBtn(unoBtn)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/api/uno/cards", {
            headers: {
              'authorization': localStorage.getItem('token'),
            },
          }
        );
        const jsonData = await response.json();
        var cards_retrieved = jsonData.cards;
        // console.log("Retrieved Cards...");
        setCards(cards_retrieved);
        cards_retrieved = shuffleCards(cards_retrieved);
        var arr = dealCards(cards_retrieved);
        var splayerdeck = arr[0];
        var smaindeck = arr[1];
        var firstcard = smaindeck[0];
        var sturn = 1;
        // console.log("firstcard");
        // console.log(firstcard.values);
        // console.log(firstcard.color);
        switch (firstcard.values) {
          //skip is 10
          case "10":
            // console.log("first card skipped played----");
            // console.log("Player 1 got skipped");
            sturn = 2
            break;
  
          //reverse is 11
          case "11":
            // console.log("first card reverse played----");
            sturn = 1
            break;
  
          //+2 draw is 12
          case "12":
            // console.log("first card draw 2 played----");
            for (var fdraw2 = 0; fdraw2 < 2; fdraw2++) {
              splayerdeck["player1"].push(smaindeck[fdraw2]);
            }
            smaindeck = smaindeck.slice(2, smaindeck.length);
  
            sturn = 2
            break;
  
          //wild is 13
          case "13":
            // console.log("first card select color played----");
            // To Choose Colour
  
            var fcolor = ["red", "blue", "yellow", "green"];
            var fnum = Math.floor(Math.random() * 4);
            firstcard.color = fcolor[fnum];
            firstcard.values = 15;
            sturn = 1
  
            break;
  
          //+4 is 14
          case "14":
            // console.log("first card draw 4 played----");
            for (var fdraw4 = 0; fdraw4 < 4; fdraw4++) {
              splayerdeck["player1"].push(smaindeck[fdraw4]);
            }
            smaindeck = smaindeck.slice(4, smaindeck.length);
            // To Choose Colour
  
            var fcolor4 = ["red", "blue", "yellow", "green"];
            var fn4um = Math.floor(Math.random() * 4);
            firstcard.color = fcolor4[fn4um];
            firstcard.values = 15;
            sturn = 2
  
            break;
          default:
            // console.log("first normal card played----");
            break;
  
        };
  
  
        socket.emit('startGame', {
          mainDeck: smaindeck,
          used: [],
          current: firstcard,
          playerdeck: splayerdeck,
          turn: sturn
        })
  
        // console.log("Set Up Game...");
      } catch (err) {
        // console.error(err.message);
      }
    };
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="gamePlay">
      {usersInRoom < 2 &&
        <div>
          <h1>Waiting for others</h1>
        </div>
      }
      {usersInRoom >= 2 &&

        <div className="multiPlay">
          <h3 style={{ margin: 0 }}>You are Player {whoami}</h3>
          <ChooseColorWild />
          <div className="">

            <Player player={players.player2} type={2} identity={whoami} />
          </div>




          <div className="row no-gutters">
            <div className="col-3">

              <div className="mmainnou">
                <UnoButton identity={whoami} />

              </div>
            </div>
            <div className="col-6 middleArea">
              <img
                className="img-responsive multicurrent"
                alt= {current.image_file.slice(8)}
                style={{ width: 90 }}
                src={
                  process.env.REACT_APP_API_URL + "/api/uno/images/" +
                  current.image_file.slice(8)
                }
              ></img>
              <MainDeck identity={whoami} />
              <div className="deckArea"></div>
            </div>

            <div className="col-3">
              <div className="mskipBtn">
                <PassTurn identity={whoami} />
              </div>
            </div>


          </div>


          <div className="">
            <Player player={players.player1} type={1} identity={whoami} />
          </div>
        </div>




      }


      <div>
        <div className="chatOpenModal" onClick={() => { setChatOpen(true); }}>
          <img
            className="img-responsive"
            style={{ width: 100 }}
            src={ChatIcon}
            alt="logo"
          />
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={chatOpen}
          className="chatroom"
        >
          <div className="row no-gutters chatheader">
            <div className="col-2">
              <img
                className="img-responsive"
                style={{ width: 40 }}
                src={ProfileIcon}
                alt="logo"
              />
            </div>
            <div className="col-8">
              <p>{username} in {roomname}</p>
            </div>
            <div className="col-2">
              <button style={{ backgroundColor: "#1B7CB1" }} onClick={() => { setChatOpen(false); }}>Close</button>
            </div>
          </div>
          <div className="chatbody">
            {messages.map((i, index) => {
              if (i.username === username) {
                return (
                  <div key={'p1' + index} className="mymessage">
                    <p>{i.text}</p>
                  </div>
                );
              } else if (i.username === "system") {
                return (
                  <div key={'sys' + index} className="systemMessage">
                    <p>{i.text}</p>
                  </div>
                );
              } else {
                return (
                  <div key={'other' + index} className="othermessage">
                    <p>{i.text} </p>
                  </div>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatsend">

            <input
          key="inputbutton"
          placeholder="Type a message"
          value={textingMsg}
          onChange={(e) => setTextingMsg(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
            <button onClick={sendData}>&gt;&gt;</button>
          </div>
        </Modal></div>



    </div>
  );
}
export default MultiPlayer;
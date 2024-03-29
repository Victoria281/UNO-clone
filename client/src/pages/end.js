// @ts-nocheck
import { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/end.css";
import Trophy from "../endGameImages/trophy.png";
import Lose from "../endGameImages/loseicon.png";
import Retry from "../endGameImages/retry.jpg";
import Home from "../endGameImages/home.png";

const End = (props) => {
  const [winner, setWinner] = useState("");
  const [cardsLeft, setCardsLeft] = useState({
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
  });
  const [points, setPoints] = useState(0);
  // console.log(props.location.state);
  const [gameresult, setGameResult] = useState(false);

  const [userHighestScores, setuserHighestScores] = useState([]);
  const [player1win, setWin] = useState(false);

  const EndGameScreen = () => (
    <div>
      <Modal isOpen={gameresult} className="gameScreen">
        <div className="row">
          <div className="col-3">
            {player1win ? <img
              className="trophy"
              alt="trophy"
              src={Trophy}
            />
              : <img
                className="loseicon"
                alt="loseicon"
                src={Lose}
              />
            }
          </div>
          <div className="col-9">
            {player1win ? <div className="headerW">You Won</div>
              : <div className="headerW">You Lose</div>
            }
            {player1win ? <div className="actionsW">+{points} Points</div>
              : <div className="actionsW">Current HighScore: {userHighestScores}</div>
            }
            {player1win ? <div className="actionsW">HighScore: {userHighestScores}</div>
              : <div className="actionsW">Try Again...</div>
            }
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
              src={Retry}
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
              src={Home}
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
        // console.log(key + " -> " + players[key].length);
      }
    }
    setCardsLeft(cardsLeft);
    setPoints(tempPts);
    setWinner(win);
    setGameResult(true);
    if (winner === "player1") {
      setWin(true);
    }
  };

  // Update to highest Score for Players
  const updatePlayerHighestScore = async () => {
    try {
      const userid = localStorage.getItem('userid')
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/uno/leaderboard/update/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          score: points
        })
      });
      console.log("updated response for highest score for players (end.js, 125)", response);
    } catch (err) {
      // console.error(err.message);
    }
  };

  // Get User Highest Score
  const userHighestScore = async () => {
    try {
      const uid = localStorage.getItem('userid')
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/uno/leaderboard/user/${uid}`, {
        method: 'GET',
        headers: {
          'authorization': localStorage.getItem('token'),
        },
      }
      );
      const jsonData = await response.json();
      var userHighScore = jsonData.score;
      console.log(userHighScore)
      setuserHighestScores(userHighScore[0].score);


      if (userHighScore[0].score < points) {
        updatePlayerHighestScore();
        // console.log("Update")
      }
    } catch (err) {
      // console.error(err.message);
    }
  };

  useEffect(() => {
    getWinner();
    userHighestScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <div className="container">
      <EndGameScreen />
    </div>
  );
};

export default End;

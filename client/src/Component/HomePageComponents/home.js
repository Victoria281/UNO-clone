import "./home.css";
import { Grid, styled, Paper, Typography } from '@mui/material';
import { homeAnimation } from "./homeAnimation";
import { useEffect } from "react";

export default function App() {

  return (
    <div className="App">
      <div className="cardsHome">
          <img className="cardImage1" alt="wildImg" src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild.png"} />
          <img className="cardImage2" alt="wildDrawImg" src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild_Draw.png"} />
      </div>

      <div className="row d-flex justify-content-between">
        <a className="startBtn" href="./newgame">
          Single Player
        </a>
        <a className="startMultiBtn" href="./createroom">
          Multiplayer
        </a>
      </div>
    </div>
  );
}

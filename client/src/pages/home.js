import "../css/home.css";
import BotDifficultyModal from "../Component/OtherComponents/BotDifficultyComponent/BotDifficultyModal";
import { useState } from "react";

export default function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <div className="cardsHome">
          <img className="cardImage1" alt="wildImg" src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild.png"} />
          <img className="cardImage2" alt="wildDrawImg" src={process.env.REACT_APP_API_URL + "/api/uno/images/Wild_Draw.png"} />
      </div>

      <button onClick={()=>{setOpen(true)}}>Start</button>
      <BotDifficultyModal open={open} setOpen={setOpen}/>
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

import React, { Fragment, useEffect, useState } from "react";

// import "../index.css";
import "../css/home.css";

export default function App() {

  return (
    <div className="App">
      <div className="cardsHome">
          <img className="cardImage1" src={"https://uno-clone.herokuapp.com/api/uno/images/Wild.png"} />
          <img className="cardImage2" src={"https://uno-clone.herokuapp.com/api/uno/images/Wild_Draw.png"} />
      </div>

      <div className="row d-flex justify-content-between">
        <a className="startBtn" href="./game">
          Single Player
        </a>
        <a className="startMultiBtn" href="./createroom">
          Multiplayer
        </a>
      </div>
    </div>
  );
}

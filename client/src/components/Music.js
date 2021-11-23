import React, { Fragment, useEffect, useState } from "react";
import music from "../sounds/Kahoot_Lobby_Music.mp3"

const Music = () => {
    const [isPlaying, setisPlaying] = useState(false);
    const [audio] = useState(new Audio(music));

      // Main function to handle both play and pause operations
        const playPause = () => {
            console.log("Before : " + isPlaying);

            if (isPlaying) {
            // Pause the song if it is playing
            audio.pause();
            } else {
            // Play the song if it is paused
            audio.play();
            audio.loop = true;
            }

            setisPlaying(!isPlaying);

            console.log("After : " + isPlaying);
        };

    return(
    <Fragment>
        <div>
          {/* Button to call our main function */}
        <button onClick={playPause} style={{backgroundColor : '#ffffff00'}}>
          <h1 style={{
            transform : "rotate(-15deg)",
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "10px"
          }}>
            {isPlaying ? 
              <i class="fa fa-volume-up"></i> : 
              <i class="fa fa-volume-off"></i>}
          </h1>
        </button>
      </div>
      </Fragment>);
};
  
export default Music;
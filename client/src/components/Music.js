import { Fragment, useState } from "react";

// @ts-ignore
import music from '../audio/Kahoot_Lobby_Music.mp3';

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
          {/* Button to call our main function */}
        <button onClick={playPause} style={{backgroundColor : '#ffffff00'}}>
          <h1 style={{
            transform : "rotate(-15deg)",
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "10px"
          }}>
            {isPlaying ? 
              <i className="fa fa-volume-up"></i> : 
              <i className="fa fa-volume-off"></i>}
          </h1>
        </button>
      </Fragment>);
};
  
export default Music;
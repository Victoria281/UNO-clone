import { Fragment, useState } from "react";
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import MusicOffTwoToneIcon from '@mui/icons-material/MusicOffTwoTone';
import styles from './styles.module.css';
// @ts-ignore
import music from './audio/UNO_Music.mp3';

const Music = ({isPlaying, setisPlaying}) => {
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
        <button onClick={playPause} className={styles.button}>
            {isPlaying ? 
              <MusicNoteTwoToneIcon fontSize="large"/> : 
              <MusicOffTwoToneIcon fontSize="large"/>}
        </button>
      </div>
      </Fragment>);
};
  
export default Music;
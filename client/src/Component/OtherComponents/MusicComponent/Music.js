import { Fragment, useEffect, useState } from "react";
import MusicNoteTwoToneIcon from '@mui/icons-material/MusicNoteTwoTone';
import MusicOffTwoToneIcon from '@mui/icons-material/MusicOffTwoTone';
import styles from './styles.module.css';
// @ts-ignore
import music from './audio/UNO_Music.mp3';
import { useDispatch, useSelector } from "react-redux";
import { getMusic, playMusic } from "../../../store/action/others/home";

const Music = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getMusic());
    },[]);
    //const [audio] = useState(new Audio(music));
    //@ts-ignore
    const isPlaying = useSelector(state => state.home_states.music);
    const audio = useSelector(state => state.home_states.audio);
    console.log(isPlaying)
    //audio.volume = 0.5;

      // Main function to handle both play and pause operations
        const playPause = () => {

            if (isPlaying) {
            // Pause the song if it is playing
            audio.pause();
            } else {
            // Play the song if it is paused
            audio.play();
            audio.loop = true;
            }

            dispatch(playMusic(isPlaying));
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
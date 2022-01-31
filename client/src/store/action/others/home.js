export const PLAY_MUSIC = "PLAY_MUSIC"
export const GET_MUSIC = "GET_MUSIC"
//@ts-ignore
import music from '../../../Component/OtherComponents/MusicComponent/audio/UNO_Music.mp3';

const audio = new Audio(music);

export const getMusic = () => async (dispatch, getState) => {
    console.log("Music gotten")
    dispatch({
        type: GET_MUSIC,
        audio: audio
    });
}

export const playMusic = (isPlaying) => async (dispatch, getState) => {
    console.log("Music toggled")
    dispatch({
        type: PLAY_MUSIC,
        music: !isPlaying
    });
}

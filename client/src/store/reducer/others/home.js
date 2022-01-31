import {
    PLAY_MUSIC,
    GET_MUSIC
} from '../../action/others/home';
//@ts-ignore
import audio from '../../../Component/OtherComponents/MusicComponent/audio/UNO_Music.mp3';

const initialState = {
    music: false,
    audio: audio
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_MUSIC:
            return {
                ...state,
                music: action.music
            };
        case GET_MUSIC:
            return {
                ...state,
                audio: action.audio
            };
        default:
            return state;
    }
};

export default reducer;

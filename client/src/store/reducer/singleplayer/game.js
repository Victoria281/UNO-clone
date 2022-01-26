import {
    SINGLEPLAYER_PREPARE_GAME,
    SINGLEPLAYER_UPDATE_GAME,
    UPDATE_UNO_PRESSED
} from '../../action/singleplayer/game';

const initialState = {
    playerTurn: 0,
    mainDeck: [],
    used: [],
    current: {},
    playerdeck: [],
    turn: "",
    order: [],
    reverse: 0,
    unoPressed: {
        player: false,
        pressed: false
    },
    unoPenalty: null,
    toDrawCard: false,
    getDrawnCard: false,
    botPlayingCard: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SINGLEPLAYER_UPDATE_GAME:
            return {
                ...state,
            };
        case SINGLEPLAYER_PREPARE_GAME:
            return {
                ...state,
                mainDeck: action.gameState.mainDeck,
                used: action.gameState.used,
                current: action.gameState.current,
                turn: action.gameState.turn,
                order: action.gameState.order,
                playerdeck: action.gameState.playerdeck,
            };
        case UPDATE_UNO_PRESSED:
            return {
                ...state,
                unoPressed: action.unoPressed
            };
        default:
            return state;
    }
};

export default reducer;

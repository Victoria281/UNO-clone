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
    unoPressed: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SINGLEPLAYER_UPDATE_GAME:
            return {
                ...state,
                mainDeck: action.new_game_state.mainDeck,
                used: action.new_game_state.used,
                current: action.new_game_state.current,
                turn: action.new_game_state.turn,
                order: action.new_game_state.order,
                playerdeck: action.new_game_state.playerdeck,
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
                unoPressed: action.press,
            };
        default:
            return state;
    }
};

export default reducer;

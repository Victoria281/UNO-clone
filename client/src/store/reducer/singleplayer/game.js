import {
    SINGLEPLAYER_PREPARE_GAME,
    SINGLEPLAYER_UPDATE_GAME,
    UPDATE_UNO_PRESSED,
    GET_BOT_STATE,
    SET_BOT_SETTINGS
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
    botcurrentstate: "",
    bot_settings: {},
    end: false
    botcurrentstate: "",
    bot_settings: {},
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
                reverse: 0,
                unoPressed: {
                    player: false,
                    pressed: false
                },
                unoPenalty: null,
                toDrawCard: false,
                getDrawnCard: false,
                botPlayingCard: false,
                end: false
            };
        case UPDATE_UNO_PRESSED:
            return {
                ...state,
                unoPressed: action.unoPressed
            };
        //Add case to update bot settings base on bot difficulty modal 
        case SET_BOT_SETTINGS:
            return {
                ...state,
                bot_settings: action.new_game_state.bot_settings
            };
        //Add case to set botcurrent state
        case GET_BOT_STATE:
            return {
                ...state,
                botcurrentstate: action.new_game_state.botcurrentstate
            };
        default:
            return state;
    }
};

export default reducer;

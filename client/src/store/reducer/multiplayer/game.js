import {
    UPDATE_PLAYER_LIST,
    PREPARE_GAME,
    UPDATE_GAME,
    UPDATE_UNO_PRESSED
} from '../../action/multiplayer/game';

const initialState = {
    player_list: [],
    mainDeck: [],
    used: [],
    current: {},
    playerdeck: [],
    turn: "",
    order: [],
    myTurnIs: "",
    unoPressed: false
};

const reducer = (state = initialState, action) => {
    // switch (action.type) {
    //     case UPDATE_PLAYER_LIST:
    //         return {
    //             ...state,
    //             player_list: action.player_list,
    //             myTurnIs: action.myTurnIs,
    //         };
    //     case UPDATE_GAME:
    //     case PREPARE_GAME:
    //         return {
    //             ...state,
    //             current: action.game_state.current,
    //             mainDeck: action.game_state.mainDeck,
    //             myTurnIs: action.game_state.myTurnIs,
    //             order: action.game_state.order,
    //             playerdeck: action.game_state.playerdeck,
    //             roomcode: action.game_state.roomcode,
    //             turn: action.game_state.turn,
    //             used: action.game_state.used,
    //         };
    //     case UPDATE_UNO_PRESSED:
    //         return {
    //             ...state,
    //             unoPressed: action.press,
    //         };
    //     default:
    //         return state;
    // }
};

export default reducer;

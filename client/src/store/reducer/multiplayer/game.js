import {
    UPDATE_PLAYER_LIST,
    PREPARE_GAME,
    UPDATE_GAME
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
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PLAYER_LIST:
            return {
                ...state,
                player_list: action.player_list,
                myTurnIs: action.myTurnIs,
            };
        case UPDATE_GAME:
        case PREPARE_GAME:
            return {
                ...state,
                mainDeck: action.data.mainDeck,
                current: action.data.current,
                playerdeck: action.data.playerdeck,
                turn: action.data.turn,
                order: action.data.order,
            };
        default:
            return state;
    }
};

export default reducer;

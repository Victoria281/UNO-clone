import {
    UPDATE_PROFILE,
} from '../../action/others/stats';

import {
    GET_USER_INFORMATION,
    UPDATE_USER_INFORMATION,
    UPDATE_USER_PROFILEPIC
} from '../../action/others/profile';


const initialState = {
    userStats: [],
    userInfo: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                userStats: action.data
            };
        case GET_USER_INFORMATION:
            return {
                ...state,
                userInfo: action.result
            };
        case UPDATE_USER_INFORMATION:
            return {
                ...state,
                response: action.result
            };
        case UPDATE_USER_PROFILEPIC:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;

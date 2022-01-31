import {
    UPDATE_PROFILE,
} from '../../action/others/stats';

import {
    GET_USER_INFORMATION,
    UPDATE_USER_INFORMATION,
    UPDATE_USER_PROFILEPIC,
    UPDATE_USER_PASSWORD
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
            console.log(action.profile_states )
            return {
                ...state,
                userInfo: action.profile_states
            };
        case UPDATE_USER_PROFILEPIC:
            console.log(action.profile_state.profileicon + "-----@#")
            return {
                ...state,
                userInfo: action.profile_state
            };
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                userInfo: action.profile_state
            };
        default:
            return state;
    }
};

export default reducer;

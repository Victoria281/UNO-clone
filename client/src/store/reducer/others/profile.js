import {
    UPDATE_PROFILE,
} from '../../action/others/stats';

const initialState = {
    userStats: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                userStats: action.data
            };
        default:
            return state;
    }
};

export default reducer;

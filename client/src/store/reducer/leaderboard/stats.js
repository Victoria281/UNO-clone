import { UPDATE_CURRENT_USER_STATS } from '../../action/leaderboard/stats';

const initialState = {
    userStats: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER_STATS:
            console.log(">>>>", action.data);
            return {
                ...state,
                userStats: action.data
            };
        default:
            return state;
    }
}

export default reducer;
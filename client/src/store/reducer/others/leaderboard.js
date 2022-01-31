import { SET_LEADERBOARD } from '../../action/others/leaderboard';

import { Leaderboard, UserScores } from '../../types';

/**
 * Initial State of the Leaderboard
 * 
 * @type {Leaderboard}
 */
const initialState = {
    user_leaderboard: [],
    topPlayers: []
};

const reducer =
    /**
     * Reducer Function to get Top 30 Players
     * 
     * @param {Leaderboard} state
     * Initial State of the Leaderboard with Typing
     *  
     * @param {*} action 
     * 
     * @returns 
     */
    (state = initialState, action) => {
        switch (action.type) {
            case SET_LEADERBOARD: {
                return {
                    ...state,
                    topPlayers: action.data.scores.slice(0, 3),
                    user_leaderboard: action.data.scores.slice(3),
                };
            }

            default: {
                return state;
            }
        }
    };

export default reducer;
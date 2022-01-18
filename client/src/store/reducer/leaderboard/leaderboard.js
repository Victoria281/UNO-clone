import { GET_TOP_30_PLAYERS } from '../../action/leaderboard/leaderboard';
import { Leaderboard, UserScores } from '../../types';

/**
 * Initial State of the Leaderboard
 * 
 * @type {Leaderboard}
 */
const initialState = {
    user_leaderboard: [],
    p1: {
        userid: 0,
        username: "",
        score: 0,
        profileicon: 'bird',
        created_at: "",
    },
    p2: {
        userid: 0,
        username: "",
        score: 0,
        profileicon: 'bird',
        created_at: "",
    },
    p3: {
        userid: 0,
        username: "",
        score: 0,
        profileicon: 'bird',
        created_at: "",
    },
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
            case GET_TOP_30_PLAYERS: {
                 console.log(">>>>", action);
                return {
                    ...state,
                    user_leaderboard: action.user_leaderboard,
                    p1: action.p1,
                    p2: action.p2,
                    p3: action.p3,
                };
            }

            default: {
                return state;
            }   
        }
    };

export default reducer;
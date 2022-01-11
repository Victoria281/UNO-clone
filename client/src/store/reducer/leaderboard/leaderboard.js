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
            case GET_TOP_30_PLAYERS:
                console.log(">>>>", action);

                /**
                 * @type {UserScores}
                 */
                let p1Data = action.data.scores[0];

                /**
                 * @type {UserScores}
                 */
                let p2Data = {
                    userid: 0,
                    username: "",
                    score: 0,
                    profileicon: 'bird',
                    created_at: "",
                };

                /**
                 * @type {UserScores}
                 */
                let p3Data = {
                    userid: 0,
                    username: "",
                    score: 0,
                    profileicon: 'bird',
                    created_at: "",
                };
                let tmpP2 = false;
                let tmpP3 = false;
                let tmpUid = action.data.scores[0].userid;
                let ctr = 0;

                while (tmpP2 === false && ctr < action.data.scores.length) {
                    // console.log("running p2 while loop, ctr:", ctr);
                    // console.log(">>", action.data.scores[ctr].userid, tmpUid);
                    // console.log(">>", action.data.scores[ctr].userid !== tmpUid);

                    if (action.data.scores[ctr].userid !== tmpUid) {
                        p2Data = action.data.scores[ctr];
                        tmpUid = action.data.scores[ctr].userid;
                        tmpP2 = true;
                    }

                    ctr++;
                };

                while (tmpP3 === false && ctr < action.data.scores.length) {
                    // console.log("running p3 while loop, ctr:", ctr);
                    // console.log(">>", action.data.scores[ctr].userid, tmpUid);
                    // console.log(">>", action.data.scores[ctr].userid !== tmpUid);

                    if (action.data.scores[ctr].userid !== tmpUid) {
                        p3Data = action.data.scores[ctr];
                        tmpUid = action.data.scores[ctr].userid;
                        tmpP3 = true;
                    }

                    ctr++;
                }

                return {
                    ...state,
                    user_leaderboard: action.data.scores,
                    p1: p1Data,
                    p2: p2Data,
                    p3: p3Data,
                };

            default:
                return state;
        };
    };

export default reducer;
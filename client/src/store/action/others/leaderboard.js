import { getPlayers } from '../../features/others/leaderboard';

export const SET_LEADERBOARD = 'SET_LEADERBOARD';

export const getTop30Players = () => async (dispatch) => {
    getPlayers()
        .then(data => {
            dispatch({
                type: SET_LEADERBOARD,
                data,
            })
        })

        .catch(err => {
            console.log("Error getting top 30 players!\n", err);
        });
}
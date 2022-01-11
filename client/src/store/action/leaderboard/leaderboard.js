import { getPlayers } from '../../features/leaderboard/user';

export const GET_TOP_30_PLAYERS = 'Get Top 30 Players';

export const getTop30Players = () => async (dispatch) => {
    getPlayers()
        .then(data => {
            dispatch({
                type: GET_TOP_30_PLAYERS,
                data,
            })
        })

        .catch(err => {
            console.log("Error getting top 30 players!\n", err);
        });
}
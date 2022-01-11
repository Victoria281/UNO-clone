import { getUser } from '../../features/leaderboard/user';
import { User } from '../../types';

export const UPDATE_CURRENT_USER_STATS = "UPDATE_CURRENT_USER_STATS";

/**
 * Asynchronous function to get and update the user's information to the store.
 * 
 * @param {User} userInfo 
 * Takes in the userId and Token as a JSON object.
 * 
 * @returns
 * Returns either the user's information or an error message, both stored inside a JSON object. 
 */
export const updateCurrentUserStats = (userInfo) => async (dispatch, getState) => {
    getUser(userInfo)
        .then(data => {
            dispatch({
                type: UPDATE_CURRENT_USER_STATS,
                data,
            });
        })
        
        .catch(err => {
            console.log("Error updating current user statistics!\n", err);
        });
}
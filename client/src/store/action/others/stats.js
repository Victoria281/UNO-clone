import { getUser } from '../../features/others/stats';
import { User } from '../../types';

export const UPDATE_PROFILE = "UPDATE_PROFILE";

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
            console.log("data");
            console.log(data);
            dispatch({
                type: UPDATE_PROFILE,
                data,
            });
        })

        .catch(err => {
            console.log("Error updating current user statistics!\n", err);
        });
}
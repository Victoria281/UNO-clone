import { User } from '../../types';
import { UserScores } from '../../types';

/**
 * Asynchronous function to get the user's information from the server.
 * 
 * @param {User} userInfo 
 * Takes in the userId of the current user.
 *
 * @returns
 * Returns either the user's information or an error message, both stored inside a JSON object.
 */
export const getUser = async (userInfo) => {
    console.log("========= getUser feature =========");
    console.log("userId: ", userInfo.userId);
    console.log("token: ", userInfo.token);
    console.log("");

    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/stat/`, {
            method: "GET",
            headers: new Headers({ 'authorization': userInfo.token }),
        });

        console.log("response: " + response.statusText);

        const data = await response.json();
        console.log("dataReceived:", data);
        console.log("===================================");

        return data;

    } catch (err) {
        console.error(">>>>", err);

        const data = {
            statusCode: 500,
            error: err
        };

        console.log("errorMsg:", JSON.stringify(data));
        console.log("===================================");
        return data;
    }
}
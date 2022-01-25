import { User } from '../../types';
import { UserScores } from '../../types';


/**
 * Asynchronous function to get the Top 30 rows of the leaderboard from the server, arranged in decreasing order of score for each user
 * 
 * @returns 
 * Returns either the top 30 rows of the leaderboard or an error message, both stored inside a JSON object.
 */
export const getPlayers = async () => {
    console.log("========= getPlayers feature =========");

    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/leaderboard/30`, {
            method: "GET",
        });

        console.log("response: " + response.statusText);

        const data = await response.json();
        // let sendData = {
        //     user_leaderboard: data.scores,
        //     p1: p1Data,
        //     p2: p2Data,
        //     p3: p3Data,
        // }
        // console.log("===================================");

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
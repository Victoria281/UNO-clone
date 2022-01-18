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
        console.log("dataReceived:", data);

        /**
         * @type {UserScores}
         */
        let p1Data = data.scores[0];

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
        let tmpUid = data.scores[0].userid;
        let ctr = 0;

        while (tmpP2 === false && ctr < data.scores.length) {
            // console.log("running p2 while loop, ctr:", ctr);
            // console.log(">>", data.scores[ctr].userid, tmpUid);
            // console.log(">>", data.scores[ctr].userid !== tmpUid);

            if (data.scores[ctr].userid !== tmpUid) {
                p2Data = data.scores[ctr];
                tmpUid = data.scores[ctr].userid;
                tmpP2 = true;
            }

            ctr++;
        }

        while (tmpP3 === false && ctr < data.scores.length) {
            // console.log("running p3 while loop, ctr:", ctr);
            // console.log(">>", data.scores[ctr].userid, tmpUid);
            // console.log(">>", data.scores[ctr].userid !== tmpUid);

            if (data.scores[ctr].userid !== tmpUid) {
                p3Data = data.scores[ctr];
                tmpUid = data.scores[ctr].userid;
                tmpP3 = true;
            }

            ctr++;
        }

        let sendData = {
            user_leaderboard: data.scores,
            p1: p1Data,
            p2: p2Data,
            p3: p3Data,
        }
        console.log("===================================");

        return sendData;
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
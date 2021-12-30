// @ts-nocheck
import "../css/leaderboard.css";
import { Redirect } from "react-router-dom";


const OtherPlayers = ({ userStat }) => {
    console.log("userStat:", userStat);

    return (
        <div className="listV">
            {userStat.map((player, index) => {
                // console.log("index:" + index);
                return (
                    <div className="row no-gutters leaderboard_player">
                        <div className="col-sm-2 leaderboard_col text-center">
                            <p className=" font-weight-bold p-2">{index + 1}</p>
                        </div>
                        <div className="col-sm-5 leaderboard_col">

                        </div>
                        <div className="col-sm-2 leaderboard_col py-2">
                            <p className="p-2">{player.score}</p>
                        </div>
                        <div className="col-sm-3 leaderboard_col py-2">
                            <p className="p-2 pr-2 createdDate">{(player.created_at)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default OtherPlayers;
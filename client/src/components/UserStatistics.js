// @ts-nocheck
import "../css/leaderboard.css";


const OtherPlayers = ({ userStat }) => {
    console.log("userStat:", userStat);

    return (
        <div className="listV">
            {userStat.map((player, index) => {
                // console.log("index:" + index);
                return (
                    <div className="row no-gutters leaderboard_player">
                        <div className="col-sm-2 leaderboard_col py-2 text-center">
                            <p className=" font-weight-bold p-2">{index + 1}</p>
                        </div>
                        <div className="col-sm-2 leaderboard_col py-2 text-center">
                            <p className="p-2">{player.game_status === 1 ? "Win" : "Loose"}</p>
                        </div>
                        <div className="col-sm-2 leaderboard_col py-2 text-center">
                            <p className="p-2">{player.score}</p>
                        </div>
                        <div className="col-sm-4 leaderboard_col py-2 text-center">
                            <p className="p-2 pr-2 createdDate">{(player.created_at)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default OtherPlayers;
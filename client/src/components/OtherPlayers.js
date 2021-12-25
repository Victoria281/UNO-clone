// @ts-nocheck
import "../css/leaderboard.css";

const OtherPlayers = ({ users }) => {
    console.log("users:", users);
    return (
        <div>
            {users.map((players, index) => {
                console.log("index:" + index);
                if (parseInt(players.userid) === parseInt(localStorage.getItem("userid"))) {
                    return (
                        <div className="row no-gutters leaderboard_player">
                            <div className="col-sm-2 leaderboard_col text-center">
                                <p className=" font-weight-bold p-2">{index + 1}</p>
                            </div>
                            <div className="col-sm-5 leaderboard_col">
                                <div className="row no-gutters">
                                    <div className="col-2 p-2">
                                        <img
                                            className="img-responsive lb2Icons"
                                            alt="pic"
                                            src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                        />
                                    </div>
                                    <div className="col-10 py-2 px-3">
                                        <p className="p-2">{players.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 leaderboard_col py-2">
                                <p className="p-2">{players.score}</p>
                            </div>
                            <div className="col-sm-3 leaderboard_col py-2">
                                <p className="p-2 pr-2 createdDate">{(players.created_by).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                } else if (index >= 3) {
                    return (
                        <div className="row no-gutters leaderboard_row">
                            <div className="col-sm-2 p-2 leaderboard_col text-center">
                                <p className="font-weight-bold">{index + 1}</p>
                            </div>
                            <div className="col-sm-5 leaderboard_col">
                                <div className="row no-gutters">
                                    <div className="col-2 p-2">
                                        <img
                                            className="img-responsive lb2Icons"
                                            alt="pic"
                                            src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                        />
                                    </div>
                                    <div className="col-10 py-2 px-3">
                                        <p className="p-2">{players.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 leaderboard_col py-2">
                                <p className="p-2">{players.score}</p>
                            </div>
                            <div className="col-sm-3 leaderboard_col py-2">
                                <p className="p-2 pr-2 createdDate">{(players.created_by).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="row no-gutters leaderboard_row">
                            <div className="col-sm-2 p-2 leaderboard_col text-center">
                                <p className="font-weight-bold">{index + 1}</p>
                            </div>
                            <div className="col-sm-5 leaderboard_col">
                                <div className="row no-gutters">
                                    <div className="col-2 p-2">
                                        <img
                                            className="img-responsive lb2Icons"
                                            alt="pic"
                                            src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                        />
                                    </div>
                                    <div className="col-10 py-2 px-3">
                                        <p className="p-2">{players.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 leaderboard_col py-2">
                                <p className="p-2">{players.score}</p>
                            </div>
                            <div className="col-sm-3 leaderboard_col py-2">
                                <p className="p-2 pr-2 createdDate">{(players.created_by).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    )
}

export default OtherPlayers;
import "../css/leaderboard.css";

const OtherPlayers = ({users}) => {
    return (
        <div>
            {users.map((players, index) => {
                if (parseInt(players.userid) === parseInt(localStorage.getItem("userid"))) {
                    return (<div class="row no-gutters leaderboard_player">
                        <div class="col-sm-2 leaderboard_col text-center">
                            <p class=" font-weight-bold p-2">{players.userid}</p>
                        </div>
                        <div class="col-sm-5 leaderboard_col">
                            <div class="row no-gutters">
                                <div class="col-2 p-2">
                                    <img
                                        class="img-responsive lb2Icons"
                                        alt="pic"
                                        src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                    />
                                </div>
                                <div class="col-10 py-2 px-3">
                                    <p class="p-2">{players.username}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 leaderboard_col py-2">
                            <p class="p-2">{players.score}</p>
                        </div>
                        <div class="col-sm-3 leaderboard_col py-2">
                            <p class="p-2">{players.created_by}</p>
                        </div>
                    </div>)
                } else if(index>3) {
                    return (
                        <div class="row no-gutters leaderboard_row">
                            <div class="col-sm-2 p-2 leaderboard_col text-center">
                                <p class="font-weight-bold">{index + 1}</p>
                            </div>
                            <div class="col-sm-5 leaderboard_col">
                                <div class="row no-gutters">
                                    <div class="col-2 p-2">
                                        <img
                                            class="img-responsive lb2Icons"
                                            alt="pic"
                                            src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                        />
                                    </div>
                                    <div class="col-10 py-2 px-3">
                                        <p class="p-2">{players.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 leaderboard_col py-2">
                                <p class="p-2">{players.score}</p>
                            </div>
                            <div class="col-sm-3 leaderboard_col py-2">
                                <p class="p-2">{players.created_by}</p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default OtherPlayers;
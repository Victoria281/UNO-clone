// @ts-nocheck
import "../css/leaderboard.css";

const OtherPlayers = ({ users }) => {
    console.log("users:", users);
    let printed = 0;
    let newIndex = 1;

    return (
        <div className="listV leaderboard_body">
            {users.map((players, index) => {
                // console.log("printed:", printed);
                
                // if the logged in user is the current user
                if (parseInt(players.userid) === parseInt(localStorage.getItem("userid")) && printed !== players.userid) {
                    // console.log("printed inside:", printed);
                    printed = players.userid;
                    newIndex++;
                    return (
                        <div className="row no-gutters leaderboard_player" id={players.userid} key={players.userid + "T" + index}>
                            <div className="col-sm-2 leaderboard_col py-2 text-center">
                                <p className=" font-weight-bold p-2">{newIndex - 1}</p>
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
                                <p className="p-2 pr-2 createdDate">{(players.created_at).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                } 
                
                // if the row to print is after the current user
                else if (index >= 3 && printed !== players.userid) {
                    printed = players.userid;
                    newIndex++;
                    return (
                        <div className="row no-gutters leaderboard_row" key={players.userid + "T" + index}>
                            <div className="col-sm-2 p-2 leaderboard_col py-2 text-center">
                                <p className="font-weight-bold">{newIndex - 1}</p>
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
                                <p className="p-2 pr-2 createdDate">{(players.created_at).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                } 
                
                // if the row to print is before the current user
                else if (index < 3 && printed !== players.userid) {
                    printed = players.userid;
                    newIndex++;
                    return (
                        <div className="row no-gutters leaderboard_row" key={players.userid + "T" + index}>
                            <div className="col-sm-2 p-2 leaderboard_col py-2 text-center">
                                <p className="font-weight-bold">{newIndex - 1}</p>
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
                                <p className="p-2 pr-2 createdDate">{(players.created_at).split("T")[0]}</p>
                            </div>
                        </div>
                    );
                } 
                
                // this handles all the extra rows that each player has
                // each row is a new entry of a score for that user (i.e. user played more than 1 game)
                else {
                    // do nothing
                }
            })}
        </div>
    )
}

export default OtherPlayers;
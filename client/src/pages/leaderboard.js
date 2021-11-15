import React, { Fragment, useEffect, useState } from "react";
import "../css/leaderboard.css";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [p1, setP1] = useState({});
    const [p2, setP2] = useState({});
    const [p3, setP3] = useState({});

    const getPlayers = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/uno/leaderboard/30"
            );
            const jsonData = await response.json();
            var user_leaderboard = jsonData.scores;
            console.log(user_leaderboard);
            setP1(user_leaderboard[0]);
            setP2(user_leaderboard[1]);
            setP3(user_leaderboard[2]);
            // user_leaderboard = user_leaderboard.slice(3, jsonData.length);
            setUsers(user_leaderboard);
            console.log(user_leaderboard);
        } catch (err) {
            console.error(err.message);
        }
    };

    const OtherPlayers = () => {
        return (
            <div>
                {users.map((players, index) => {
                    if (parseInt(players.userid) === parseInt(localStorage.getItem("userid"))) {
                        return (<div class="row no-gutters leaderboard_player pt-2">
                            <div class="col-sm-1 leaderboard_col">
                                <p class="p-2">4</p>
                            </div>
                            <div class="col-sm-6 leaderboard_col">
                                <div class="row no-gutters">
                                    <div class="col-2">
                                        <img
                                            class="img-responsive lb2Icons"
                                            alt="leaderboard"
                                            src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                        />
                                    </div>
                                    <div class="col-10">
                                        <p class="p-2">{players.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2 leaderboard_col">
                                <p class="p-2">{players.score}</p>
                            </div>
                            <div class="col-sm-3 leaderboard_col">
                                <p class="p-2">{players.created_by}</p>
                            </div>
                        </div>)
                    } else {
                        return (
                            <div class="row no-gutters leaderboard_row pt-2">
                                <div class="col-sm-1 leaderboard_col">
                                    <p class="p-2">{index + 1}</p>
                                </div>
                                <div class="col-sm-6 leaderboard_col">
                                    <div class="row no-gutters">
                                        <div class="col-2">
                                            <img
                                                class="img-responsive lb2Icons"
                                                alt="leaderboard"
                                                src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + players.profileicon + ".png"}
                                            />
                                        </div>
                                        <div class="col-10">
                                            <p class="p-2">{players.username}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 leaderboard_col">
                                    <p class="p-2">{players.score}</p>
                                </div>
                                <div class="col-sm-3 leaderboard_col">
                                    <p class="p-2">{players.created_by}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <Fragment>
            {users.length === 0 || (
                <div class="gameBody">
                    <h3>Top 30 Leaderboard</h3>
                    <div class="row no-gutters">
                        <div class="col-7">
                            <div class="borderDesign1">
                                <div class="lb1IconBorder">
                                    <img
                                        class="img-responsive lb1Icons"
                                        alt="leaderboard"
                                        src="https://uno-clone.herokuapp.com/api/uno/profile_icons/bird.png"
                                    />
                                </div>
                                <p class="lbuser">{p1.username}</p>
                                <p class="lbuser">
                                    <strong>{p1.score}</strong> ({p1.created_by})
                                </p>
                            </div>
                            <div class="row no-gutters">
                                <div class="col-6">
                                    <div class="borderDesign">
                                        <div class="lb2IconBorder">
                                            <img
                                                class="img-responsive lb2Icons"
                                                alt="leaderboard"
                                                src="https://uno-clone.herokuapp.com/api/uno/profile_icons/toucan.png"
                                            />
                                        </div>
                                        <p class="lbuser">{p2.username}</p>{" "}
                                        <p class="lbuser">
                                            <strong>{p2.score}</strong> ({p2.created_by})
                                        </p>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="borderDesign">
                                        <div class="lb2IconBorder">
                                            <img
                                                class="img-responsive lb2Icons"
                                                alt="leaderboard"
                                                src="https://uno-clone.herokuapp.com/api/uno/profile_icons/cat.png"
                                            />
                                        </div>
                                        <p class="lbuser">{p3.username}</p>{" "}
                                        <p class="lbuser">
                                            <strong>{p3.score}</strong> ({p3.created_by})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-5">
                            <div class="leaderboard_body">
                                <div class="row no-gutters">
                                    <div class="col-sm-1 leaderboard_col">
                                        <h6 class="p-2">No</h6>
                                    </div>
                                    <div class="col-sm-6 leaderboard_col">
                                        <h6 class="p-2">Players</h6>
                                    </div>
                                    <div class="col-sm-2 leaderboard_col">
                                        <h6 class="p-2">Score</h6>
                                    </div>
                                    <div class="col-sm-3 leaderboard_col">
                                        <h6 class="p-2">Created</h6>
                                    </div>
                                </div>
                                <OtherPlayers />



                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Leaderboard;

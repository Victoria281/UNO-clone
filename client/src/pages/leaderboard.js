import React, { Fragment, useEffect, useState } from "react";
import "../css/leaderboard.css";
import crownImage from "../icons/pepicons_crown.png";
import Confetti from 'react-confetti';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);    
    const [ifConfetti, setifConfetti] = useState(true);
    const [p1, setP1] = useState({});
    const [p2, setP2] = useState({});
    const [p3, setP3] = useState({});

    var currentdate = new Date();

    const getPlayers = async () => {
        try {
            const response = await fetch(
                "https://uno-clone.herokuapp.com/api/uno/leaderboard/30"
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
    const toggleConfetti = () => {
        setTimeout(() => {
            setifConfetti(false);
        }, 4000);
    }

    useEffect(() => {
        getPlayers();
        toggleConfetti();
    }, []);

    return (
        <Fragment>
            {users.length === 0 || (
                <div class="gameBody">
                      {ifConfetti ? <Confetti
                        run={ifConfetti}
                        width={window.innerWidth*0.6}
                        height={window.innerHeight}
                        /> : null} 
                    <div class="row no-gutters">
                        <div class="col-7 p-5">
                            <div id="podium" class="row no-gutters">
                                <div className="col-4">
                                    <div className="h-25"> </div>
                                    <div id="podiumPillar2">
                                        <div class="lb2IconBorder">
                                            <img
                                                class="img-responsive lb1Icons"
                                                alt="pic"
                                                src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + p2.profileicon + ".png"}
                                            />
                                        </div>
                                        <div class="borderDesign2">
                                            <div className="d-flex justify-content-end">
                                                <div id="triangle2"></div>
                                            </div>
                                            <p class="lbuserheader">{p2.username}</p>{" "}
                                            <p class="lbuser">
                                                <strong>{p2.score}pts</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div id="firsplace" class="col-4">
                                    <div id="podiumPillar1">
                                        <div className="d-flex justify-content-end">
                                            <img
                                                id="crown"
                                                class="img-responsive"
                                                alt="pic"
                                                src={crownImage} />
                                        </div>

                                        <div class="lb1IconBorder">
                                            <img
                                                class="img-responsive lb1Icons"
                                                alt="pic"
                                                src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + p1.profileicon + ".png"}
                                            />
                                        </div>
                                        <div class="borderDesign1">
                                            <div className="d-flex justify-content-end">
                                                <div id="triangle1"></div>
                                            </div>
                                            <p className="lbuserheader">
                                                {p1.username}
                                            </p>
                                            <p class="lbuser">
                                                <strong>{p1.score}pts</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <div className="h-50"> </div>
                                    <div id="podiumPillar3">
                                        <div class="lb3IconBorder">
                                            <img
                                                class="img-responsive lb1Icons"
                                                alt="pic"
                                                src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + p3.profileicon + ".png"}
                                            />
                                        </div>
                                        <div class="borderDesign3">
                                            <div className="d-flex justify-content-end">
                                                <div id="triangle3"></div>
                                            </div>
                                            <p class="lbuserheader">{p3.username}</p>{" "}
                                            <p class="lbuser">
                                                <strong>{p3.score}pts</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-5">
                            <div class="leaderboard_body">
                                <div class="row no-gutters">
                                    <div class="col-sm-2 leaderboard_col text-center">
                                        <h6 class="p-1 font-weight-bold">No</h6>
                                    </div>
                                    <div class="col-sm-5 leaderboard_col">
                                        <h6 class="p-1 font-weight-bold">Players</h6>
                                    </div>
                                    <div class="col-sm-2 leaderboard_col">
                                        <h6 class="p-1 font-weight-bold">Score</h6>
                                    </div>
                                    <div class="col-sm-3 leaderboard_col">
                                        <h6 class="p-1 font-weight-bold">Created</h6>
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
// @ts-nocheck
import React, { Fragment, useEffect, Suspense, useState } from "react";
import "../css/leaderboard.css";
import crownImage from "../icons/pepicons_crown.png";
import Confetti from 'react-confetti';
import { LoadingScreen } from "../components/loadingScreen";
const OtherPlayers = React.lazy(() => import("../components/OtherPlayers"));

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [ifConfetti, setifConfetti] = useState(true);
    const [p1, setP1] = useState({});
    const [p2, setP2] = useState({});
    const [p3, setP3] = useState({});

    // var currentdate = new Date();

    const getPlayers = async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_URL + "/api/uno/leaderboard/30"
            );
            const jsonData = await response.json();
            var user_leaderboard = jsonData.scores;
            console.log(user_leaderboard);
            setP1(user_leaderboard[0]);
            setP2(user_leaderboard[1]);
            setP3(user_leaderboard[2]);
            // user_leaderboard = user_leaderboard.slice(3, jsonData.length);
            setUsers(user_leaderboard);
            // console.log(user_leaderboard);
        } catch (err) {
            // console.error(err.message);
        }
    };

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
                <div className="gameBody">
                    {ifConfetti ? <Confetti run={ifConfetti} width={window.innerWidth * 0.6} height={window.innerHeight} /> : null}
                    <div className="row no-gutters">
                        <div className="col-7 p-5 mb-6">
                            <div id="podium" className="row no-gutters pillarBody">
                                <div className="col-4 p-2" id="podiumPillar2">
                                    <div className="lb2IconBorder">
                                        <img className="img-responsive lb1Icons" alt="pic" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + p2.profileicon + ".png"} />
                                    </div>
                                    <div className="borderDesign2">
                                        <div className="d-flex justify-content-end">
                                            <div id="triangle2"></div>
                                        </div>
                                        <p className="lbuserheader">{p2.username}</p>{" "}
                                        <p className="lbuser">
                                            <strong>{p2.score} pts</strong>
                                        </p>
                                    </div>
                                </div>

                                <div className="col-4 p-2" id="podiumPillar1">
                                    <div className="d-flex justify-content-end">
                                        <img id="crown" className="img-responsive" alt="pic" src={crownImage} />
                                    </div>

                                    <div className="lb1IconBorder">
                                        <img className="img-responsive lb1Icons" alt="pic" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + p1.profileicon + ".png"} />
                                    </div>
                                    <div className="borderDesign1">
                                        <div className="d-flex justify-content-end">
                                            <div id="triangle1"></div>
                                        </div>
                                        <p className="lbuserheader">
                                            {p1.username}
                                        </p>
                                        <p className="lbuser">
                                            <strong>{p1.score}pts</strong>
                                        </p>
                                    </div>
                                </div>

                                <div className="col-4 p-2" id="podiumPillar3" >
                                    <div className="lb3IconBorder">
                                        <img className="img-responsive lb1Icons" alt="pic" src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + p3.profileicon + ".png"} />
                                    </div>
                                    <div className="borderDesign3">
                                        <div className="d-flex justify-content-end">
                                            <div id="triangle3"></div>
                                        </div>
                                        <p className="lbuserheader">{p3.username}</p>{" "}
                                        <p className="lbuser">
                                            <strong>{p3.score}pts</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-5 pt-3">
                            <div className="leaderboard_body">
                                <div className="row no-gutters">
                                    <div className="col-sm-2 leaderboard_col text-center">
                                        <h6 className="p-1 font-weight-bold">No</h6>
                                    </div>
                                    <div className="col-sm-5 leaderboard_col">
                                        <h6 className="p-1 font-weight-bold">Players</h6>
                                    </div>
                                    <div className="col-sm-2 leaderboard_col">
                                        <h6 className="p-1 font-weight-bold">Score</h6>
                                    </div>
                                    <div className="col-sm-3 leaderboard_col">
                                        <h6 className="p-1 font-weight-bold">Created</h6>
                                    </div>
                                </div>
                                <Suspense fallback={<LoadingScreen />}>
                                    <OtherPlayers users={users} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Leaderboard;
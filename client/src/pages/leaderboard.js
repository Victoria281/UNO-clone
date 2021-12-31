// @ts-nocheck
import React, { Fragment, Suspense, Component } from "react";
import "../css/leaderboard.css";
import crownImage from "../icons/pepicons_crown.png";
import Confetti from 'react-confetti';
import { LoadingScreen } from "../components/loadingScreen";
const OtherPlayers = React.lazy(() => import("../components/OtherPlayers"));
const UserStatistics = React.lazy(() => import("../components/UserStatistics"));

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userStat: [],
            ifConfetti: true,
            p1: {},
            p2: {},
            p3: {},
            selectedTab: 'stats',
        };
        this.changeSelectedTab = this.changeSelectedTab.bind(this);
    }

    componentDidMount() {
        this.getPlayers();
        this.getUserStat();
    }

    async getPlayers() {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_URL + "/api/uno/leaderboard/30"
            );
            const jsonData = await response.json();
            var user_leaderboard = jsonData.scores;
            // console.log(user_leaderboard);
            // setP1(user_leaderboard[0]);
            // setP2(user_leaderboard[1]);
            // setP3(user_leaderboard[2]);
            // setUsers(user_leaderboard);

            this.setState({
                users: user_leaderboard,
                p1: user_leaderboard[0],
                p2: user_leaderboard[1],
                p3: user_leaderboard[2],
            }, () => {
                console.log("Current state of getPlayers after calling api:", this.state);
            });
        } catch (err) {
            // console.error(err.message);
        }
    }

    async getUserStat() {
        try {
            const token = localStorage.getItem("token");
            console.log("userToken:", token);

            const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/stat/`, {
                method: "GET",
                headers: {
                    'authorization': token
                }
            });

            console.log("response: " + response.statusText);
            const data = await response.json();
            console.log("dataReceived:", data.score);

            this.setState({
                userStat: data.score
            });

        } catch (err) {
            console.error(">>>>", err);
        }
    }

    stopConfetti() {
        setTimeout(() => {
            console.log("running!");
            this.setState({ ifConfetti: false });
        }, 5000);
    }

    checkConfettiStats(ifConfetti) {
        console.log("ifConfetti:", ifConfetti);
        return ifConfetti ? <Confetti run="true" id="confettiLeaderboard" width={window.innerWidth * 0.6} height={window.innerHeight} onConfettiComplete={this.stopConfetti()} /> : null;
    }

    changeSelectedTab(tab) {
        // console.log("original_inState:", this.state.selectedTab);
        // console.log("new_toChange:", tab);
        const { selectedTab } = this.state;

        switch (tab) {
            case "leaderboard":
                if (selectedTab === "leaderboard") {
                    // do nothing
                } else {
                    this.setState({ selectedTab: "leaderboard" });
                }
                break;

            case "stats":
                if (selectedTab === "stats") {
                    // do nothing
                } else {
                    this.setState({ selectedTab: "stats" });
                    this.setState({ ifConfetti: true });
                }
                break;
            default:
                this.setState({ selectedTab: "leaderboard" });
                // console.log("after:", this.state.selectedTab);
                break;
        }
    }

    tab() {
        return (
            <div className="tabContainer no-gutters">
                <div className="tabSelector">
                    <div className="ldb">
                        <a id="leaderboardTab" className="tabText" onClick={() => this.changeSelectedTab('leaderboard')}>Leaderboard</a>
                        {/* <p className="tabText">Leaderboard</p> */}
                    </div>
                    <div className="stats">
                        <a id="statsTab" className="tabText" onClick={() => this.changeSelectedTab('stats')}>My Stats</a>
                        {/* <p className="tabText">My Stats</p> */}
                    </div>
                </div>
            </div>
        )
    }

    leaderboard() {
        const { users, p1, p2, p3, ifConfetti } = this.state;


        return (
            <Fragment>
                <div className="gameBody">
                    <div id="activeContent" className="row no-gutters">
                        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 pt-5 pl-5 pr-5">
                            {this.checkConfettiStats(ifConfetti)}
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

                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 pt-3">
                            <h4 className="text-center">Leaderboard</h4>
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
                            <div className="leaderboard_body">
                                <Suspense fallback={<LoadingScreen />}>
                                    <OtherPlayers users={users} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    stats() {
        const { userStat } = this.state;
        let totalGames = userStat.length;
        let totalWins = 0;
        let lastGame;

        for (let i = 0; i < userStat.length; i++) {
            if (userStat[i].game_status === 1) {
                totalWins++;
            }

            if (i === 0) {
                lastGame = userStat[i].created_at;
            }
             
            if (lastGame < userStat[i].created_at) {
                lastGame = userStat[i].created_at;
            }
        }

        console.log("totalWins", totalWins);
        console.log("lastGame", lastGame);

        return (
            <Fragment>
                <div className="gameBody">
                    <div id="activeContent" className="row no-gutters statsTabStyle">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-3">
                            <h4 className="text-center">__username__ Game Statistics</h4>


                            <div className="row no-gutters mt-4">
                                <div className="col-sm-6 leaderboard_col text-right">
                                    <h6 className="p-1 font-weight-bold">My Total No. of Games:</h6>
                                    <h6 className="p-1 font-weight-bold">My Total No. of Wins:</h6>
                                    <h6 className="p-1 font-weight-bold">My Latest Game was on:</h6>
                                </div>
                                <div className="col-sm-2 leaderboard_col text-center">
                                    <h6 className="p-1 font-weight-bold">{totalGames}</h6>
                                    <h6 className="p-1 font-weight-bold">{totalWins}</h6>
                                    <h6 className="p-1 font-weight-bold">{lastGame}</h6>
                                </div>

                            </div>

                            <div className="row no-gutters mt-4">
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

                            <div className="leaderboard_body">
                                <Suspense fallback={<LoadingScreen />}>
                                    <UserStatistics userStat={userStat} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        const { users, selectedTab } = this.state;

        if (selectedTab === "leaderboard") {
            return (
                <Fragment>
                    {users.length === 0 || (
                        <div>
                            {this.tab()}
                            {this.leaderboard()}
                        </div>
                    )}
                </Fragment>
            );
        } else if (selectedTab === "stats") {
            return (
                <Fragment>
                    {users.length === 0 || (
                        <div>
                            {this.tab()}
                            {this.stats()}
                        </div>
                    )}
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    {users.length === 0 || (
                        <div>
                            {this.tab()}
                        </div>
                    )}
                </Fragment>
            );
        }

    }
}
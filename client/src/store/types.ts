import rootReducers from "./reducer/index";

export interface User {
    userId: number;
    token: string;
}


export interface UserScores {
    userid: number;
    username: string;
    score: number;
    profileicon: "bird" | "cat" | "elephant" | "fox" | "frog" | "koala" | "shell" | "toucan" | "turtle" | "whale";
    created_at: string;
}

export interface Leaderboard {
    user_leaderboard: UserLeaderboard;
    topPlayers: topPlayers;
}

export type UserLeaderboard = UserScores[];
type topPlayers = [];

export type RootState = ReturnType<typeof rootReducers>;
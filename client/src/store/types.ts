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
    p1: Player1;
    p2: Player2;
    p3: Player3;
}

export type UserLeaderboard = UserScores[];
type Player1 = UserScores;
type Player2 = UserScores;
type Player3 = UserScores;

export type RootState = ReturnType<typeof rootReducers>;
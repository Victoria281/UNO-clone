import SecurityReducer from "./secure_action";
import multiplayer_rooms from "./multiplayer/rooms";
import multiplayer_game from "./multiplayer/game";
import leaderboard_stats from "./leaderboard/stats";
import leaderboard_leaderboard from "./leaderboard/leaderboard";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer,
  multiplayer_rooms,
  multiplayer_game,
  leaderboard_stats,
  leaderboard_leaderboard,
});

export default rootReducers;
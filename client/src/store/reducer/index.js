import SecurityReducer from "./secure_action";
import multiplayer_rooms from "./multiplayer/rooms";
import multiplayer_game from "./multiplayer/game";
import leaderboard_leaderboard from "./others/leaderboard";
import profile_info from "./others/profile"

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer,
  multiplayer_rooms,
  multiplayer_game,
  leaderboard_leaderboard,
  profile_info
});

export default rootReducers;
import SecurityReducer from "./secure_action";
import multiplayer_rooms from "./multiplayer/rooms";
import multiplayer_game from "./multiplayer/game";
import leaderboard_leaderboard from "./others/leaderboard";
import profile_info from "./others/profile"
import singleplayer_game from "./singleplayer/game"

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer,
  multiplayer_rooms,
  multiplayer_game,
  leaderboard_leaderboard,
  profile_info,
  singleplayer_game
});

export default rootReducers;
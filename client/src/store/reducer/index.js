import SecurityReducer from "./secure_action";
import multiplayer_rooms from "./multiplayer/rooms";
import leaderboard_leaderboard from "./others/leaderboard";
import profile_info from "./others/profile"
import singleplayer_game from "./singleplayer/game"
import home_states from './others/home'

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer,
  multiplayer_rooms,
  leaderboard_leaderboard,
  profile_info,
  singleplayer_game,
  home_states
});

export default rootReducers;
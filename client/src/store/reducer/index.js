import SecurityReducer from "./secure_action";
import multiplayer_rooms from "./multiplayer/rooms";
import multiplayer_game from "./multiplayer/game";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer,
  multiplayer_rooms,
  multiplayer_game
});
export default rootReducers;
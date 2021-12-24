// @ts-nocheck
import { SecurityReducer } from "./secure_action";
// import { BotPlayReducer } from "./bot_play";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer: SecurityReducer,
  // BotPlayReducer: BotPlayReducer,
});
export default rootReducers;
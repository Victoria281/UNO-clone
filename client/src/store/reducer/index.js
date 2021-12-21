import { SecurityReducer } from "./secure_action";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  SecurityReducer: SecurityReducer,
});
export default rootReducers;
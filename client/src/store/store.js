// @ts-nocheck
import rootReducers from "./reducer/index";
import { createStore } from '@reduxjs/toolkit';
import { saveState, loadState } from "./persistStore";
import thunk from "redux-thunk"
import logger from "redux-logger"

import { applyMiddleware } from "redux"
const persistedStore = loadState();
export const store = createStore(
    rootReducers,
    persistedStore,
    // applyMiddleware(thunk, logger),
    applyMiddleware(thunk),
);

store.subscribe(() => {
    saveState(store.getState());
});
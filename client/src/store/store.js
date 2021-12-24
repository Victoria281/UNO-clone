// @ts-check
import rootReducers from "./reducer/index";
import { createStore, createSelector } from '@reduxjs/toolkit';

export const store = createStore(
    rootReducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
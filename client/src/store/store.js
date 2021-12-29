// @ts-nocheck
import rootReducers from "./reducer/index";
import { createStore } from '@reduxjs/toolkit';

export const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
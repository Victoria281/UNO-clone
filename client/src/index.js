// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import { Provider } from "react-redux";

// @ts-ignore
const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducers from "./store/reducer/index";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"
import logger from "redux-logger"

const store = createStore(rootReducers, applyMiddleware(thunk, logger));

const loader = document.querySelector('.loader');
const hideLoader = () => loader.hidden = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        hideLoader={hideLoader}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
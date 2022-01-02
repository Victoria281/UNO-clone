// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducers from "./store/reducer/index";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"

const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
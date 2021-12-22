import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import { Provider } from "react-redux";

// @ts-ignore
const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log("Current State of Store:", store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
// @ts-nocheck
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducers);

ReactDOM.render(
  <ReactDOM.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactDOM.StrictMode>,
  document.getElementById('root')
);
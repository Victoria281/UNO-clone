import React, { Fragment } from "react";
import './App.css';

//components
import AllCards from "./components/AllCards";

function App() {
  return (
    <Fragment>
      <div class="container">
        <h1>Hello World</h1>
        <AllCards />

      </div>
    </Fragment>
  );
}

export default App;

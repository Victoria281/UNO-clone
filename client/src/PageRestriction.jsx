import React from "react";
import { Route, Redirect } from "react-router-dom";

const EndGame = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(routeProps) => {
      const id = localStorage.getItem("userid");
      console.log(id);

      if (id) {
        console.log("render component");
      } else {
        console.log('REDIRECT TO "/login"!!!');
        alert("Please Login");
      }

      return id !== null ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default EndGame;
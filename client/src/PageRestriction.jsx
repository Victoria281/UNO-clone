// @ts-nocheck
import React from "react";
import { Route, Redirect } from "react-router-dom";

const Restrict = ({ component: Component, socket, ...props }) => (
  <Route
    {...props}
    render={(routeProps) => {
      const id = localStorage.getItem("userid");
      const token = localStorage.getItem("token");
      // console.log("pagerestriction");
      // console.log(id);
      // console.log(socket);

      if (id) {
        // console.log("render component");
      } else {
        // console.log('REDIRECT TO "/login"!!!');
        alert("Please Login");
      }

      return (id !== null && token !== null) ? (
        <Component socket={socket} {...routeProps} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default Restrict;
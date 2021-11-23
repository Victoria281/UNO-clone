import React, { Fragment, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import "../css/account.css";
// import { response } from "express";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [post, setPost] = React.useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");


 


  // Function called when login button is clicked
  function createPost() {
    axios
      .post("https://uno-clone.herokuapp.com/api/uno/login", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', 'Bearer '+response.data.token)
        localStorage.setItem('userid', response.data.user_id)
        alert("Login successful!")
      })
      .catch((error) => {
        if(error.response){
          console.log("ERROR RESPONSESSSSSSSSS")
          console.log(error.response.data)
          console.log(error.response.status);
          console.log(error.response.headers);
        }else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("------------------INSIDE ERROR REQUEST---------------------")
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("BIG FAT ERRORRRR")
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }

   
 

  const handleEmailChange = (e) => {
    setSuccessMsg("");
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSuccessMsg("");
    setPasswordError("");
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // checking if email is empty
    if (email !== "") {
      // Checks email with regex expression
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(email)) {
        setEmailError("");
      } else {
        setEmailError("Invalid Email");
      }
    } else {
      setEmailError("Email Required");
    }

    // Check if password is empty
    if (password != "") {
      // Do something here!
    } else {
      setPasswordError("Password Required");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h3>
          <b>Login</b>
        </h3>

        <form
          className="form-group form"
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          {successMsg && <div className="success-msg">{successMsg}</div>}
          <label style={{ marginRight: 340, marginTop: 10 }}>Email:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email address"
            onChange={handleEmailChange}
            value={email}
          />
          {emailError && <div className="error-msg">{emailError}</div>}

          <label style={{ marginRight: 310, marginTop: 10 }}>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={password}
          />
          {passwordError && <div className="error-msg">{passwordError}</div>}

          <button
            type="submit"
            className="btn btn-success btn-lg"
            style={{ width: "50%", marginTop: 30, height: 50 }}
            onClick={createPost}
          >
            <p style={{fontSize: 15}}>Login</p>
          </button>
        </form>
      </div>
    </div>
  );
}

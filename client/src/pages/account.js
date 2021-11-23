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
  const [credWrong, setCredWrong] = useState("");
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
        localStorage.setItem('Bearer token', response.data.token)
        localStorage.setItem('userid', response.data.user_id)
        setCredWrong("");
        window.location.replace("https://uno-clone.herokuapp.com")
        alert("Login successful!")
      })
      .catch((error) => {
        if (error.response) {
          console.log("ERROR RESPONSESSSSSSSSS")
          console.log(error.response.data)
          console.log(error.response.status);
          console.log(error.response.headers);
          setCredWrong("Wrong Credentials Entered!");
        } else if (error.request) {
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
        
        <h1><b id="loginTxt" className="p-3">Login</b></h1>
        <div id="loginSection" className="p-5">
          <h3>
            
          </h3>

          <form
            className="form-group form"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            {successMsg && <div className="success-msg">{successMsg}</div>}
            <label style={{ marginRight: 340, marginTop: 10 }}>Email:</label>


            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Email Address" onChange={handleEmailChange} value={email} />
            </div>

            {emailError && <div className="error-msg">{emailError}</div>}

            <label style={{ marginRight: 310, marginTop: 10 }}>Password:</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} />
            </div>

            {passwordError && <div className="error-msg">{passwordError}</div>}

            {credWrong && <div className="error-msg">{credWrong}</div>}

            <button
              type="submit"
              className="btn btn-success btn-lg"
              style={{ marginTop: 15, height: 50, backgroundColor: '#FFB967', border: '1px solid #FFB967', borderRadius: '50%'}}
              onClick={createPost}
              id="submitBtn"
            >
              <p id="btnTxt" style={{ fontSize: 42, fontWeight: 'bolder' , fontFamily: 'Rubik Mono One', color:'black', marginTop: -20}}><b>Login</b></p>
            </button><br/><br/>
            <a href="http://localhost:3000/register" id="registerLink" className="p-4"> Create Account? </a>
            <a href="http://localhost:3000/register" id="forgotLink" className="p-4"> Forgot Password? </a>
          </form>
        </div>
      </div>
    </div>
  );
}

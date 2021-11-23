import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/register.css";
import e from "cors";

export default function App() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCfmError, setPasswordCfmError] = useState("");

  const [duplicateMsg, setDuplicateMsg] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

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

  const handleCfmPasswordChange = (e) => {
    setSuccessMsg("");
    setPasswordCfmError("");
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // if (username != "") {
    //   // If username is not empty
    //   setUsernameError("");
      
    //   if (email !== "") {
    //     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //     if (emailRegex.test(email)) {
    //       setEmailError("");
    //       if (password !== "") {
    //         setPasswordError("");
    //         if (confirmpassword !== "") {
    //           setPasswordCfmError("");
    //           if (confirmpassword !== password) {
    //             setPasswordCfmError("Password does not match!");
    //           } else {
    //             setSuccessMsg("Successfully Created!");
    //           }
    //         } else {
    //           setPasswordCfmError("Confirm Password Required");
    //         }
    //       } else {
    //         setPasswordError("Password Required");
            
    //       }
    //     } else {
    //       setEmailError("Not a valid format!");
    //     }
    //   } else {
    //     setEmailError("Email Required");
    //     // document.getElementById("registerBtn").disabled=true;
    //   }
    // } else {
    //   // If username is empty
    //   setUsernameError("Username Required");
    // }
    // console.log((emailError == "") && (usernameError == "") && (passwordError == "" ) && (passwordCfmError == ""))
    // return((emailError == "") && (usernameError == "") && (passwordError == "" ) && (passwordCfmError == ""));

  };

  // Function called when register button is clicked
  function createPost() {
    var status = true;
    
    
    if(status==true){
      // Check Username Fields
        if(username==""){
          status = false;
          setUsernameError("Username Required");
        }else{
          status = true;
          setUsernameError("");
        }
    }
    
    if(status==true){
      // Check Email Field
      if(email==""){
        status = false;
        setEmailError("Email Required");
      }else{
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (emailRegex.test(email)) {
          status = true;
          setEmailError("");
        }else{
          status = false;
          setEmailError("Not a valid format")
        }
      }
    }
    
    if(status==true){
      // Check password field
      if(password==""){
        status = false;
        setPasswordError("Password required")
      }else{
        status = true;
        setPasswordError("");
        // Regex must contain 1 lowercase, 1 uppercase, 1 number, 1 special character (escapes reserved RegEx in case of conflict),
        // string must be 8 chars or longer
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(passwordRegex.test(password)){
          status = true;
          setPasswordError("");
        }else{
          status = false;
          setPasswordError("Criteria: Upper and Lowercase, Number, Special Char")
        }
      }
    }
    
    if(status==true){
      // Check confirm password field
      if(confirmpassword==""){
        status = false;
        setPasswordCfmError("Confirm Password Required");
      }else{
        if(confirmpassword == password){
          status = true;
          setPasswordCfmError("");
          
          
        }else{
          status = false;
          setPasswordCfmError("Password does not match confirm password");
        }
      }
    }
    
    console.log("STATUS: " + status);
    // console.log((emailError == "") && (usernameError == "") && (passwordError == "" ) && (passwordCfmError == ""))
    if(status){

      axios
        .post("http://localhost:5000/api/uno/register", {
          userName: username,
          email: email,
          password: password
        })
        .then((response) => {
          console.log(response)
          // If no duplicates, set error to empty
          setDuplicateMsg("");
          alert("Register successful!")
        })
        .catch((error) => {
          if(error.response){
            console.log("ERROR RESPONSESSSSSSSSS")
            console.log(error.response.data)
            console.log(error.response.status);
            console.log(error.response.headers);
            // Set state of duplicate msg
            setDuplicateMsg("There is a duplicate of either username or email. Please change.")
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
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h1><b id="registerTxt" className="p-3">Register</b></h1>
          
        
        <div id="registerSection" className="p-5">
        
        {duplicateMsg && <div className="error-msg">{duplicateMsg}</div>}
          <form
            className="form-group form"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            {successMsg && <div className="success-msg">{successMsg}</div>}
            <label className="mt-2">Username:</label>
            

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="text" className="form-control pr-5" placeholder="Username" onChange={handleUsernameChange} value={username} />
            </div>

            {usernameError && <div className="error-msg">{usernameError}</div>}

            <label >Email:</label>
            

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="text" className="form-control" placeholder="Email" onChange={handleEmailChange} value={email} />
            </div>

            {emailError && <div className="error-msg">{emailError}</div>}

            <label>Password (must be 8 characters):</label>
            <div class="input-group mb-">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} />
            </div>

            {passwordError && <div className="error-msg">{passwordError}</div>}

            <label className="mt-3">
              Confirm Password:
            </label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={handleCfmPasswordChange} value={confirmpassword} />
            </div>

            {passwordCfmError && (
              <div className="error-msg">{passwordCfmError}</div>
            )}

            <button
              id="registerBtn"
              type="submit"
              className="btn btn-success btn-lg"
              style={{ width: "40%", marginTop: 30, height: 50, backgroundColor: '#45BDF8', borderRadius: '50%'}}
              onClick={createPost}
              
            >
            <p id="registerBtnTxt" style={{ fontSize: 42, fontWeight: 'bolder' , fontFamily: 'Rubik Mono One', color:'black', marginTop: -20}}>Register</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

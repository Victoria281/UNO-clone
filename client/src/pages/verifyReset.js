// @ts-nocheck
import React, { Fragment, useEffect, useState } from "react";

import emailjs from 'emailjs-com'

import { useLocation } from "react-router-dom";
import "../css/verifyReset.css";
// import { response } from "express";
import axios from "axios";



export default function App() {
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("");
  const [passwordCfmError, setPasswordCfmError] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [storeMissing, setStoreMissing] = useState("");

  // const search = useLocation().search;
  // const id = new URLSearchParams(search).get('u');

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

  };

  window.addEventListener("storage", function () {
    // do your checks to detect
    // changes in "e1", "e2" & "e3" here
    console.log("localstorage is being modified")
    window.localStorage.clear()
    console.log("localstorage is being cleared due to changes made!")
  }, false);

  window.onunload = () => {
    // Clear the local storage when page refreshes
    window.localStorage.clear()
    // console.log(localStorage.getItem('email'))
  }

  function submitReset(){
    let status = true;
    let email = localStorage.getItem('email');
    
    console.log(email)

    if(email === null){
      status = false;
      setStoreMissing("Please send email again!")
    }
    if(status === true){
      if(password==""){
        status = false;
        setPasswordError("Please enter a new password!")
      }else{
        status = true;
        setPasswordError("")
        setStoreMissing("")
        // Regex must contain 1 lowercase, 1 uppercase, 1 number, 1 special character (escapes reserved RegEx in case of conflict),
        // string must be 8 chars or longer
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(passwordRegex.test(password)){
          status = true;
          setPasswordError("")
          setStoreMissing("")
        }else{
          status = false;
          setPasswordError("Criteria: Upper and Lowercase, Number, Special Char")
        }
      }
    }

    if(status===true){
      // Check confirm password field
      if(confirmpassword == ""){
        status = false;
        setPasswordCfmError("Confirm Password Required")
      }else{
        if(confirmpassword == password){
          status = true;
          setPasswordCfmError("");
          setStoreMissing("")
        }else{
          status = false;
          setPasswordCfmError("Password does not match confirm password");
        }
      }
    }


    // Send axios
      if(status){
    
        axios
          .put(`http://localhost:5000/api/uno/user/reset`, {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response)
            // If no duplicates, set error to empty
            window.location = "/login"
          })
          .catch((error) => {
            if(error.response){
              console.log(error.response)
              alert('It seems this email has yet been registered. Please register with us!')
              window.location="/register"
              console.log("THERE IS AN ERROR OMGG!")
            }
          })
      }

  }



  return (
    <div className="App">
      <div className="wrapper">
        <h1><b id="resetTxt" className="p-3">Reset Password</b></h1>
          
       
        <div id="resetSection" className="pt-5 pl-5 pr-5 pb-2">
        
          <form
            className="form-group form"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
             {/* <h2>{id}</h2> */}
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {storeMissing && <div>{storeMissing}</div>}

            <label className="mt-4">New Password (must be 8 characters):</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} autocomplete="off"/>
            </div>

            {passwordError && <div className="error-msg">{passwordError}</div>}

            <label className="mt-3">
              Confirm Password:
            </label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={handleCfmPasswordChange} value={confirmpassword} autocomplete="off"/>
            </div>

            {passwordCfmError && (
              <div className="error-msg">{passwordCfmError}</div>
            )}

            <button
              id="resetBtn"
              type="submit"
              className="btn btn-success btn-lg link pop-on-hover"
              style={{ width: "40%", marginTop: 30, height: 50, backgroundColor: '#45BDF8', borderRadius: '50%'}}
              onClick={submitReset}
              
            >
            <p id="resetBtnTxt" style={{ fontSize: 42, fontWeight: 'bolder' , fontFamily: 'Rubik Mono One', color:'black', marginTop: -20}}>Reset</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  )

}

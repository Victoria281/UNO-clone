//@ts-nocheck
import React, { useState } from "react";
import "../../../css/account.css";
// import { response } from "express";
import axios from "axios";


export default function App() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credWrong, setCredWrong] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  // const [shake, setShake] = useState(false);


  // const animate = () => {
        
  //   // Button begins to shake
  //   setShake(true);
    
  //   // Buttons stops to shake after 2 seconds
  //   setTimeout(() => setShake(false), 2000);
    
  // }

  // Function called when login button is clicked
  function createPost() {
    var status = true;

    if(status === true){
      // Check email field
      if(email===""){
        status = false;
        setEmailError("Email Required!");
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
    // console.log("AFTERRRRRRRRRRRRRR EMAIL CHECK")
    // console.log(status);

    if(status === true){
      // Check password field
      if(password===""){
        status = false;
        setPasswordError("Password Required!");
      }else{
        status = true;
        setPasswordError("");
      }
    }
    // console.log("AFTERRRRRRR PASSWORD CHECK")
    // console.log(status)



    if(status){
      axios
      .post("http://localhost:5000/api/uno/login", {
        email: email,
        password: password
      })
      .then((response) => {
        // console.log(response)
        localStorage.setItem('token', 'Bearer '+response.data.token)
        localStorage.setItem('userid', response.data.user_id)
        localStorage.setItem('username', response.data.username)
        setCredWrong("");
        window.location = '/'
        // alert("Login successful!")
      })
      .catch((error) => {
        if (error.response) {
          // console.log("ERROR RESPONSESSSSSSSSS")
          // console.log(error.response.data)
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setCredWrong("Wrong Credentials Entered!");
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log("------------------INSIDE ERROR REQUEST---------------------")
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("BIG FAT ERRORRRR")
          // console.log('Error', error.message);
        }
        // console.log(error.config);
      })
    }


// // checking if email is empty
// if (email !== "") {
//   // Checks email with regex expression
//   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   if (emailRegex.test(email)) {
//     setEmailError("");
//   } else {
//     setEmailError("Invalid Email");
//   }
// } else {
//   setEmailError("Email Required");
// }

// // Check if password is empty
// if (password != "") {
//   // Do something here!
// } else {
//   setPasswordError("Password Required");
// }





    
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
            <label>Email:</label>


            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="text" className="form-control pr-4" placeholder="Email Address" onChange={handleEmailChange} value={email} autocomplete="on"/>
            </div>

            {emailError && <div className="error-msg">{emailError}</div>}

            <label>Password:</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type="password" className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} autocomplete="off"/>
            </div>

            {passwordError && <div className="error-msg">{passwordError}</div>}

            {credWrong && <div className="error-msg">{credWrong}</div>}

            <button
              type="submit"
              className="btn btn-success btn-lg mt-4 link pop-on-hover"
              style={{ marginTop: 15, height: 50, backgroundColor: '#FFB967', border: '1px solid #FFB967', borderRadius: '50%'}}
              onClick={createPost}
              id="submitBtn"
            >
              <p id="btnTxt" style={{ fontSize: 42, fontWeight: 'bolder' , fontFamily: 'Rubik Mono One', color:'black', marginTop: -20}}><b>Login</b></p>
            </button><br/><br/><br/>
            {/* <button onClick = {animate} className = {shake ? `shake` : null}>Click me</button> */}
            <a href="/register" id="registerLink" className="p-4"> <b>Create Account?</b> </a>
            <a href="/forgot" id="forgotLink" className="p-4"> <b>Forgot Password?</b> </a>
          </form>
        </div>
      </div>
    </div>
  );
}
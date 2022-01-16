//@ts-nocheck
import React, { useState } from "react";
import "../../../css/account.css";
// import { response } from "express";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";


export default function App() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credWrong, setCredWrong] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");


  // Recaptcha on change function, value used to verify if user is really not a robot
  function onChange(value) {
    console.log("Captcha value:", value);
    if(value!=null){
      console.log("Starts becoming valid")
      setCaptcha(true);
    }else{

      // After 1 minute, the captcha would expire, requiring the user to revalidate again
        console.log('Captcha has invalidated!')
        alert("Captcha has been invalidated. Please verify again!")
        setCaptcha(false);

    }
    
  }

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

    // Check if status has been validated
    if(status){
      if(captcha === false){
        status = false;
        setCaptchaError("Please ensure you are not a robot!")
      }else{
        status = true;
        setCaptchaError("");
      }
    }
    

    if(status){
      axios
      .post(process.env.REACT_APP_API_URL + "/api/uno/login", {
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

    // Password visibility function
    const togglePassword1 = () => {
      setPasswordShown1(!passwordShown1);
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
              <input type="text" className="form-control pr-2" placeholder="Email Address" onChange={handleEmailChange} value={email} />
            </div>

            {emailError && <div className="error-msg">{emailError}</div>}

            <label>Password:</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i></span>
              </div>
              <input type={passwordShown1 ? "text" : "password"} className="form-control" placeholder="Password" onChange={handlePasswordChange} value={password} />
              <button onClick={togglePassword1}><VisibilityIcon style={{padding: 2, marginTop: 6}}/></button>
            </div>

            {passwordError && <div className="error-msg">{passwordError}</div>}

            {credWrong && <div className="error-msg">{credWrong}</div>}


            {/* Recaptcha section */}
            <ReCAPTCHA
              sitekey="6LcitAkeAAAAAE9MsKKtc5-CFwLhZiRTrlxNfOYK"
              size="normal"
              type="image"
              onChange={onChange}
            />
            {captchaError && <div className="error-msg">{captchaError}</div>}

            <button
              type="submit"
              className="btn btn-success btn-lg"
              style={{ marginTop: 15, height: 50, backgroundColor: '#FFB967', border: '1px solid #FFB967', borderRadius: '50%'}}
              onClick={createPost}
              id="submitBtn"
            >
              <p id="btnTxt" style={{ fontSize: 42, fontWeight: 'bolder' , fontFamily: 'Rubik Mono One', color:'black', marginTop: -20}}><b>Login</b></p>
            </button><br/><br/>
            <a href="/register" id="registerLink" className="p-4"> Create Account? </a>
            <a href="/forgot" id="forgotLink" className="p-4"> Forgot Password? </a>
          </form>
        </div>
      </div>
    </div>
  );
}
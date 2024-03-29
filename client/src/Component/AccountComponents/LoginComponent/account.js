//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import "../../../css/account.css";
import styles from '../styles.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import useSound from 'use-sound';
import boopSfx from '../soundEffect/boop.wav';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CustomNotification from '../../OtherComponents/NotificationComponent/Notifications';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

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
  const [play] = useSound(boopSfx);
  const [notif, setNotif] = useState({ open: false, type: "", message: "" });

  // Hooks to disable Form
  const [attempt, setAttempt] = useState(0);
  const [formDisabled, setFormDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);

  let history = useHistory();


  // Resets Timer Function
  function reset() {
    setSeconds(10);
    setIsActive(false);
    setIsShown(false);
  }

  useEffect(() => {
    let interval = null;
    if (formDisabled) {
      setIsShown(true);
      setIsActive(true);
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (seconds === 0) {
      clearInterval(interval)
      reset();
    }
    return () => clearInterval(interval);
  }, [formDisabled, seconds]);

  // Recaptcha on change function, value used to verify if user is really not a robot
  function onChange(value) {
    console.log("Captcha value:", value);
    if (value != null) {
      console.log("Starts becoming valid")
      setCaptcha(true);
    } else {

      // After 1 minute, the captcha would expire, requiring the user to revalidate again
      console.log('Captcha has invalidated!')
      alert("Captcha has been invalidated. Please verify again!")
      setCaptcha(false);

    }

  }

  // Function called when login button is clicked
  function createPost() {
    let status = true;

    // Check email field
    if (email === "") {
      status = false;
      setNotif({ open: true, type: 'error', message: 'Email is required!' })
      //setEmailError("Email Required!");
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(email)) {
        status = true;
      } else {
        status = false;
        //setEmailError("Not a valid format")
        setNotif({ open: true, type: 'error', message: 'Email is not valid!' })
      }
    }



    if (status) {
      // Check password field
      if (password === "") {
        status = false;
        //setPasswordError("Password Required!");
        setNotif({ open: true, type: 'error', message: 'Password Required!' })
      } else {
        status = true;
        //setPasswordError("");
      }
    }

    // Check if status has been validated
    if (status) {
      if (captcha === false) {
        status = false;
        //setCaptchaError("Please ensure you are not a robot!")
        setNotif({ open: true, type: 'error', message: 'Please input captcha!' })
      } else {
        setCaptchaError("");
        console.log("Attempt Number: " + attempt);
        setAttempt(attempt + 1);
        localStorage.setItem("attempt", attempt)
      }
    }

    if (status) {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/uno/login", {
          email: email,
          password: password
        })
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', 'Bearer ' + response.data.token)
          localStorage.setItem('userid', response.data.user_id)
          localStorage.setItem('username', response.data.username)
          setCredWrong("");
          setNotif({ open: true, type: 'success', message: 'Login Successful' })
          window.location = '/'
          // alert("Login successful!")
        })
        .catch((error) => {
          if (error.response) {
            // console.log("ERROR RESPONSESSSSSSSSS")
            // console.log(error.response.data)
            // console.log(error.response.status);
            // console.log(error.response.headers);
            //setCredWrong("Wrong Credentials Entered!");
            setNotif({ open: true, type: 'error', message: 'Login Unsuccessful' })
            // If attempt is 5 times, disable form
            if (attempt == 4) {
              status = false;
              setFormDisabled(true);
              setBtnDisabled(true);
              //alert("The form has been disabled. Please wait for a while")
              setNotif({ open: true, type: 'error', message: 'Form is disabled' })
              // Enable form after 10 secs
              setTimeout(() => {
                setFormDisabled(false);
                setBtnDisabled(true);
                setAttempt(0);
              }, 10000);

              console.log("CANNOT SEND FORM DUE TO ATTEMPT")
            }
            console.log("Login Error")
          } else {
            // console.log("Login Failed!")
          }
        
        })
    }


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

  // Google OAuth Button
  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID Token: " + response.credential);

    const result = await fetch(process.env.REACT_APP_API_URL + "/api/uno/login/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + response.credential
      }
    });

    const data = await result.json();
    console.log(data);

    localStorage.setItem('token', 'Bearer ' + data.token);
    localStorage.setItem('userid', data.user_id);
    localStorage.setItem('username', data.username);

    const redirectToHome = () => {
      history.push('/');
    };

    redirectToHome();
  }

  const initializeGoogleAuth = () => {
    try {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(document.getElementById("google-auth-button"), { theme: 'outline', size: 'large', position: 'absolute', top: '300px' });
      // google.accounts.id.prompt();
    } catch (error) {
      console.log("google login failed to load in the set time");
    }
  }

  // initializeGoogleAuth();

  return (
    <div className="App">
      <div className="wrapper">
        <CustomNotification uopen={notif} usetOpen={setNotif} />
        <h1><b className={styles.accountTitle}>Login</b></h1>

        <div className={styles.accountBody}>
          {initializeGoogleAuth()}
          <div className="container">
            <div className="row no-gutters justify-content-center m-2">
              <div className="col-xl-6 col-mlg-6 col-md-6 col-sm-6 col-xs-6">
                <div id="google-auth-button" className={`m-2`}></div>
              </div>
            </div>
          </div>

          <h5 className={styles.oauthSeparator}><span>OR</span></h5>

          <form
            className={`form-group form ${styles.accountForm}`}
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <fieldset disabled={formDisabled}>
              {/* {successMsg && <div className="success-msg">{successMsg}</div>} */}
              <label style={{ marginRight: 445 }}>Email:</label>


              <div className={`input-group ${styles.accountEmailDiv}`}>
                <div className={`input-group-prepend`}>
                  <span className={`input-group-text ${styles.accountInputItems}`}><EmailIcon /></span>
                </div>
                <input type="text" className={`form-control ${styles.accountInputItems}`} style={{ paddingRight: 10 }} placeholder="Email Address" onChange={handleEmailChange} value={email} />
              </div>

              {/* {emailError && <div className="error-msg">{emailError}</div>} */}

              <label style={{ marginRight: 415 }}>Password:</label>
              <div className={`input-group`} style={{ marginBottom: 20 }}>
                <div className={`input-group-prepend`}>
                  <span className={`input-group-text ${styles.accountInputItems}`}><LockIcon /></span>
                </div>
                <input type={passwordShown1 ? "text" : "password"} className={`form-control ${styles.accountInputItems}`} style={{ paddingRight: 10 }} placeholder="Password" onChange={handlePasswordChange} value={password} />
                <button onClick={togglePassword1}><VisibilityIcon style={{ padding: 2, marginTop: 6 }} /></button>
              </div>

              {/* {passwordError && <div className="error-msg">{passwordError}</div>} */}

              {/* {credWrong && <div className="error-msg">{credWrong}</div>} */}


              {/* Recaptcha section */}
              <ReCAPTCHA
                sitekey="6LcitAkeAAAAAE9MsKKtc5-CFwLhZiRTrlxNfOYK"
                size="normal"
                type="image"
                onChange={onChange}
              />
              {captchaError && <div>{captchaError}</div>}

              <button
                type="submit"
                style={{ marginTop: 20, height: 50, backgroundColor: '#FFB967', border: '1px solid #FFB967', borderRadius: '50%' }}
                onClick={() => { createPost(); play(); }}
                className={styles.accountSubmitBtn}
                disabled={btnDisabled}
              >
                <p className={styles.accountLoginText} style={{ fontSize: 48, fontWeight: 'bolder', fontFamily: 'Rubik Mono One', color: 'black', marginTop: -18 }}><b>Login</b></p>
              </button><br /><br />
              <a href="/register" style={{ padding: 60 }}> Create Account? </a>
              <a href="/forgot" style={{ padding: 60 }}> Forgot Password? </a>

            </fieldset>
          </form>

          {
            isShown ?
              <div className="time">
                Timeout: {seconds}s
              </div> :
              <div></div>

          }

        </div>
      </div>
    </div>
  );
}
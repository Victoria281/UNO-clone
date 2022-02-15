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
import { TextField, Box } from "@mui/material";
import { AccountCircle, PasswordRounded, KeyRounded } from "@mui/icons-material";

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

export default function App() {
  const [captcha, setCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [play] = useSound(boopSfx);
  const [notif, setNotif] = useState({ open: false, type: "", message: "" });

  // Hooks to disable Form
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
    let attempt = localStorage.getItem("attempt");

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    console.log("email:", email);
    console.log("password:", password);

    // Check email field
    if (email === "") {
      setNotif({ open: true, type: 'error', message: 'Email is required!' });

    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (emailRegex.test(email)) {

        // Check password field
        if (password === "") {
          setNotif({ open: true, type: 'error', message: 'Password Required!' });

        } else {

          // Check if status has been validated
          if (captcha === false) {
            setNotif({ open: true, type: 'error', message: 'Please input captcha!' });

          } else {
            console.log("Attempt Number: " + attempt);
            let toUpdate;

            if (isNaN(attempt)) {
              toUpdate = 1;

            } else {
              toUpdate = parseInt(attempt) + 1;

            }

            localStorage.setItem("attempt", toUpdate);

            axios
              .post(process.env.REACT_APP_API_URL + "/api/uno/login", {
                email: email,
                password: password
              })
              .then((response) => {
                // console.log(response)
                localStorage.setItem('token', 'Bearer ' + response.data.token);
                localStorage.setItem('userid', response.data.user_id);
                localStorage.setItem('username', response.data.username);
                setNotif({ open: true, type: 'success', message: 'Login Successful' });
                history.push("/");

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
                    setFormDisabled(true);
                    setBtnDisabled(true);
                    //alert("The form has been disabled. Please wait for a while")
                    setNotif({ open: true, type: 'error', message: 'Form is disabled' })
                    // Enable form after 10 secs
                    setTimeout(() => {
                      setFormDisabled(false);
                      setBtnDisabled(true);
                      localStorage.setItem("attempt", 0);
                    }, 10000);

                    console.log("CANNOT SEND FORM DUE TO ATTEMPT");

                  }

                  console.log("Login Error");
                } else {
                  console.log("error:", error);
                }

              })
          }
        }

      } else {
        setNotif({ open: true, type: 'error', message: 'Email is not valid!' });

      }
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // Google OAuth Button
  const handleCredentialResponse = async (response) => {
    //console.log("Encoded JWT ID Token: " + response.credential);

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

          <form className={`form-group form ${styles.accountForm}`} autoComplete="off" onSubmit={handleFormSubmit}>
            <fieldset disabled={formDisabled}>

              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth id="email-input" variant="standard" label="Email" type="email" style={{ paddingRight: 10 }} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginY: 2 }}>
                <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth id="password-input" variant="standard" label="Password" type="password" style={{ paddingRight: 10 }} />
              </Box>

              {/* Recaptcha section */}
              <Box sx={{ marginY: 1, alignItem: 'center' }}>
                <ReCAPTCHA
                  sitekey="6LcitAkeAAAAAE9MsKKtc5-CFwLhZiRTrlxNfOYK"
                  size="normal"
                  type="image"
                  onChange={onChange}
                />
              </Box>


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
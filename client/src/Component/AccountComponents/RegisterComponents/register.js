// @ts-nocheck
import { useState } from "react";

import axios from "axios";
// import "../../../css/register.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import useSound from 'use-sound';
import boopSfx from '../soundEffect/boop.wav';
import nodemailer from 'nodemailer';
import styles from '../styles.module.css'
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';


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
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const [play] = useSound(boopSfx);

  // let transporter = nodemailer.createTransport({
  //   service: "smtp.mailtrap.io",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.EMAIL,
  //     pass: process.env.WORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //   },
  //  });
  //  transporter.verify((err, success) => {
  //   err
  //     ? console.log(err)
  //     : console.log(`=== Server is ready to take messages: ${success} ===`);
  //  });


  

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

  };

  // Password visibility function
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  // Function called when register button is clicked
  function createPost() {
    var status = true;


    if (status === true) {
      // Check Username Fields
      if (username === "") {
        status = false;
        setUsernameError("Username Required");
      } else {
        status = true;
        setUsernameError("");
      }
    }

    if (status === true) {
      // Check Email Field
      if (email === "") {
        status = false;
        setEmailError("Email Required");
      } else {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (emailRegex.test(email)) {
          status = true;
          setEmailError("");
        } else {
          status = false;
          setEmailError("Not a valid format")
        }
      }
    }

    if (status === true) {
      // Check password field
      if (password === "") {
        status = false;
        setPasswordError("Password required")
      } else {
        status = true;
        setPasswordError("");
        // Regex must contain 1 lowercase, 1 uppercase, 1 number, 1 special character (escapes reserved RegEx in case of conflict),
        // string must be 8 chars or longer
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (passwordRegex.test(password)) {
          status = true;
          setPasswordError("");
        } else {
          status = false;
          setPasswordError("Criteria: Upper and Lowercase, Number, Special Char")
        }
      }
    }

    if (status === true) {
      // Check confirm password field
      if (confirmpassword === "") {
        status = false;
        setPasswordCfmError("Confirm Password Required");
      } else {
        if (confirmpassword === password) {
          status = true;
          setPasswordCfmError("");


        } else {
          status = false;
          setPasswordCfmError("Password does not match confirm password");
        }
      }
    }

    // console.log("STATUS: " + status);
    // // console.log((emailError == "") && (usernameError == "") && (passwordError == "" ) && (passwordCfmError == ""))
    if (status) {

      axios
        .post("http://localhost:5000/api/uno/register", {
          userName: username,
          email: email,
          password: password
        })
        .then((response) => {
          // console.log(response)
          // If no duplicates, set error to empty
          setDuplicateMsg("");
          window.location = "/login"
        })
        .catch((error) => {
          if (error.response) {
            // Set state of duplicate msg
            setDuplicateMsg("There is a duplicate of either username or email. Please change.")
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
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h1><b className={styles.registerTxt} style={{padding: 10}}>Register</b></h1>


        <div className={`${styles.registerSection}`} style={{padding: 30}}>

          {/* {duplicateMsg && <div className="error-msg">{duplicateMsg}</div>} */}
          <form
            className="form-group form"
            style={{marginTop: 10, marginRight: 70, marginLeft: 70, width: '400px'}}
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            {/* {successMsg && <div className="success-msg">{successMsg}</div>} */}
            <label style={{marginTop: 20, marginRight: 320}}>Username:</label>

            <div className="input-group" style={{marginBottom: 10}}>
              <div className="input-group-prepend">
                <span className={`input-group-text ${styles.registerInputItems}`}><PersonIcon/></span>
              </div>
              <input type="text" className={`form-control ${styles.registerInputItems}`} style={{paddingRight: 10}} placeholder="Username" onChange={handleUsernameChange} value={username} autocomplete="off"/>
            </div>

            {/* {usernameError && <div className="error-msg">{usernameError}</div>} */}

            <label style={{marginRight: 360}}>Email:</label>


            <div className="input-group">
              <div className="input-group-prepend">
                <span className={`input-group-text ${styles.registerInputItems}`}><EmailIcon/></span>
              </div>
              <input type="text" className={`form-control ${styles.registerInputItems}`} style={{paddingRight: 10}} placeholder="Email" onChange={handleEmailChange} value={email} autocomplete="off"/>
            </div>

            {/* {emailError && <div className="error-msg">{emailError}</div>} */}

            <label style={{marginTop: 10, marginRight: 160}}>Password (must be 8 characters):</label>
            <div className="input-group" style={{marginBottom: 10}}>
              <div className="input-group-prepend">
                <span className={`input-group-text ${styles.registerInputItems}`}><LockIcon/></span>
              </div>
              <input type={passwordShown1 ? "text" : "password"} className={`form-control ${styles.registerInputItems}`} style={{paddingRight: 40}} placeholder="Password" onChange={handlePasswordChange} value={password} autocomplete="off"/>
              <button onClick={togglePassword1}><VisibilityIcon style={{padding: 2, marginTop: 6}}/></button>
            </div>

            {/* {passwordError && <div className="error-msg">{passwordError}</div>} */}

            <label style={{marginRight: 260}}>
              Confirm Password:
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className={`input-group-text ${styles.registerInputItems}`}><LockIcon/></span>
              </div>
              <input type={passwordShown2 ? "text" : "password"} className={`form-control ${styles.registerInputItems}`} style={{paddingRight: 40}} placeholder="Confirm Password" onChange={handleCfmPasswordChange} value={confirmpassword} autocomplete="off"/>
              <button onClick={togglePassword2}><VisibilityIcon style={{padding: 2, marginTop: 6}}/></button>
            </div>

            {/* {passwordCfmError && (
              <div className="error-msg">{passwordCfmError}</div>
            )} */}

            <button
              type="submit"
              className={`${styles.registerBtn}`}
              style={{ width: "40%", marginTop: 30, height: 50, backgroundColor: '#45BDF8', borderRadius: '50%'}}
              onClick={()=>{createPost(); play()}}
            >
              <p className={`${styles.registerBtnTxt}`} style={{ fontSize: 36, fontWeight: 'bolder', fontFamily: 'Rubik Mono One', color: 'black', marginTop: -5, marginLeft: -10 }}>Register</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

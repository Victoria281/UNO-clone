import React, { Fragment, useEffect, useState } from "react";

// import emailjs from 'emailjs-com'

import { useHistory } from "react-router-dom";
import useSound from 'use-sound';
// @ts-ignore
import boopSfx from '../soundEffect/boop.wav';
import axios from "axios";

import * as emailjs from "emailjs-com"
import { handle } from "express/lib/application";
import styles from '../styles.module.css'
import Ripples from 'react-ripples'

export default function App() {


  const [email, setEmail] = useState("")  
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState("")
  const [play] = useSound(boopSfx);

  function submitReset(){

  // For Email Testing
    // let status = true;

    // // Check Email Field
    // if(email==""){
    //   status = false;
    //   setEmailError("Please fill it up!")
    // }else{
    //   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //   if (emailRegex.test(email)) {
    //     status = true;
    //     setEmailError("");
    //   }else{
    //     status = false;
    //     setEmailError("Not a valid format")
    //   }
    // }
  
    // if(status){

    //   axios
    //     .post("http://localhost:5000/api/uno/verify", {
    //       email: email,
    //     })
    //     .then((response) => {
    //       console.log("The response is: " + response)
    //       setEmailError("")
    //       setEmailSuccess("You have successfully submitted. Please check your email for more details!")
          
          
    //     })
    //     .catch((error) => {
    //       if(error.response){
    //         console.log("THERES AN ERROR IN ERROR.RESPONSE!")
    //         console.log(error.response)
    //         setEmailSuccess("")
    //         setEmailError("Email not found. Please enter an existing email!")
    //       }
    //     })
    // }

    let status = true;

    if(email==""){
      status = false;
      setEmailError("Please fill it up!")
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

    if(status){
      emailjs.sendForm(
      "gmail",
      "template_oqw2h4p",
      ".form-group",
      "user_08YyNUDtUmEl3fjJjTEs5"
    )
    .then()
    .catch()
    }
    
    
  }





  // const handleSend = async() => {

  //   console.log("Before enter Axios")
  //   setSent(true)
  //   console.log(email)
  //   try{
  //       console.log("About to use axios!!")
        
  //   await axios.post("http://localhost:5000/api/uno/verify", {
  //     email
  //   })
  //   console.log("After using Axios!")
  //   } catch(error){
  //       console.log(error)
  //   }
  // }


  window.addEventListener("storage", function () {
    // do your checks to detect if modifications were made to localstorage
    console.log("localstorage is being modified")
    window.localStorage.clear()
    console.log("localstorage is being cleared due to changes made!")
  }, false);

  window.onunload = () => {
    // Clear the local storage when page refreshes
    window.localStorage.clear()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('Bearer token')
    window.localStorage.removeItem('username')
    localStorage.setItem('email', email);
  };


  return (
    <div className="App">
      <div className="wrapper">
      <h1><b className={`${styles.forgotTitle}` } style={{padding: 10}}>Reset Password</b></h1>
        <div className={`${styles.forgotBody}`} style={{padding: 40}}>
        
        <form 
            className="form-group form"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <fieldset disabled={true}></fieldset>
            {/* {emailSuccess && <div>{emailSuccess}</div>}
            {emailError && <div>{emailError}</div>} */}
                <label><b style={{paddingRight: 10}}>Enter email:</b></label>
                <input type="text" name="email" autoComplete="on" style={{marginTop: 40, marginBottom: 20,  borderRadius: 5}} size={38} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="hidden" name="url" value={process.env.REACT_APP_API_URL}></input>
              
                <button 
                  className={`${styles.forgotBtn}`} 
                  style={{ width: "40%", marginTop: 20, height: 60, backgroundColor: 'orange', borderRadius: 40}} 
                  type="submit" onClick={()=>{submitReset(); play()}}><b style={{fontSize: 20, marginBottom: 20}}>Send Email</b>
                  
                </button>
          </form>
            
        </div>
      </div>
    </div>
  )

}

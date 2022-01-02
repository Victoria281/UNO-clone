import React, { Fragment, useEffect, useState } from "react";

// import emailjs from 'emailjs-com'

import { useHistory } from "react-router-dom";
import "../css/forgot.css";
// import { response } from "express";
import axios from "axios";
// npm install emailjs-com --save
import * as emailjs from "emailjs-com"
import { handle } from "express/lib/application";



export default function App() {


  const [email, setEmail] = useState("")  
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState("")

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
    // console.log(localStorage.getItem('email'))
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
      <h1><b id="forgotTxt" className="p-2">Reset Password</b></h1>
        <div id="forgotSection" className="pt-5 pl-5 pr-5 pb-2">
        <form 
            className="form-group form"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            {emailSuccess && <div>{emailSuccess}</div>}
            {emailError && <div>{emailError}</div>}
          
                <input type="text" name="email" autoComplete="on" style={{marginTop: 20, marginBottom: 20,  borderRadius: 5}} size={38} value={email} onChange={(e) => setEmail(e.target.value)} />
                <button 
                  className="btn btn-success btn-lg link pop-on-hover" 
                  style={{ width: "40%", marginTop: 20, height: 60, backgroundColor: 'orange', borderRadius: 40}} 
                  type="submit" onClick={submitReset}><b style={{fontSize: 20, marginBottom: 20}}>Send Email</b>
                </button>
          </form>
            
        </div>
      </div>
    </div>
  )

}
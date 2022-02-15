// JWT Module
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config");

// Environment Variables
const dotenv = require("dotenv");
dotenv.config();

// console.log(">>>>>>", process.env);

const verifyGoogleToken = async (req, res, next) => {
  // Retrieval of Authorization Header
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    console.log("no no googleverifyToken");
    return res.status(401).send();
  }

  const token = authHeader.replace("Bearer ", "");
  // console.log("token:", token);

  if (token.length < 150) {
    console.log("moving on!");
    
    next();
  } else {
    // Google Auth Library
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("ticket:", ticket);

    const payload = ticket.getPayload();

    req.googlePayload = payload;
    req.googleToken = token;

    console.log("Decoded Payload:", payload);

    next();
  }


};

module.exports = verifyGoogleToken;
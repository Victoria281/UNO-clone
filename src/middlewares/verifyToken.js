// import { verify } from "jsonwebtoken";
// import JWT_SECRET from "../../config";
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    console.log("no verifyToken");
    return res.status(401).send();
  }
  const token = authHeader.replace("Bearer ", "");

  if (token.length > 150) {
    console.log("use google");
    next();
  }

  jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).send();
    }
    console.log("decodedToken", decodedToken)
    req.decodedToken = decodedToken;
    next();
  });
};


module.exports = verifyToken;
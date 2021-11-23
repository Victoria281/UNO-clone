const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config");

var verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }
    console.log("decodedToken")
    console.log(decodedToken)
    req.decodedToken = decodedToken;
    next();
  });
};


module.exports=verifyToken;
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call the next middleware function
};

const errorHandle = (err, req, res, next) => {
  //console.error("Error server: ________", err.message);

  return res.status(500).send({ msg: err.message });
};

const idValidator = (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) {
    next();
  }
  throw Error(`Id: ${id} contains string`);
};

const verifyToken = (req, res, next) => {
  // extract token from request header from client
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      error: "Access denied!",
    });
  }

  token = token.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

module.exports = { logger, idValidator, errorHandle, verifyToken };

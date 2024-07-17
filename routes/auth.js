// routes/tweets.js
const express = require("express");
const { loginUser, signupUser } = require("../controllers/auth.js");
const authRouter = express.Router();

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;

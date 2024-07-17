require("dotenv").config();

const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const parser = require("body-parser");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

const userRoute = require("./routes/user.js");
const bookRouter = require("./routes/book.js");

//DB Connect
const dbConnect = require("./db/db.js");
dbConnect().catch((err) => console.log(err));

// validator
const { errorHandle, logger, verifyToken } = require("./middlewares/index.js");
const tweet = require("./routes/tweet.js");
const authRouter = require("./routes/auth.js");

const password = require("passport");
const jwtStrategy = require("./common/strategies/jwt-strategy.js");
const passport = require("passport");
password.use(jwtStrategy);

app.use(parser.json());
app.use(logger);
app.use("/auth", authRouter);
app.use("/users", verifyToken, userRoute);
app.use("/books", bookRouter);
app.use("/tweets", passport.authenticate("jwt", { session: false }), tweet);
app.use(errorHandle);

server = https.createServer({ key, cert }, app);

server.listen(4000, () => {
  console.log("Listening on port 4000!");
});

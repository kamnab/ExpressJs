// index.js

const express = require('express');
const app = express();
const port = 3000;


// Example middleware function
const logger2 = (req, res, next) => {
  setTimeout(() => {
    console.log("_____________ Timeout");
  }, 3000);
  console.log(`logger2: ${req.method} ${req.url}`);
  next(); // Call the next middleware function
};

// Example middleware function
const logger = (req, res, next) => {
  console.log(`logger1: ${req.method} ${req.url}`);
  next(); // Call the next middleware function
};

// Using middleware in Express.js
//app.use(logger);

app.get('/', logger2, (req, res) => {
  res.send('Hello World!s');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

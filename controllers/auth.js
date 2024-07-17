// controllers/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const user = new User({ email, password: hashedPassword });
  const result = await user.save();
  res.status(201).json({ message: "User created successfully" });
};

// controllers/auth.js
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Find the user by username
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Verify the password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",

      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    }
  );
  res.status(200).json({ token });
};

module.exports = { signupUser, loginUser };

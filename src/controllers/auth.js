// src/controllers/auth.js
// DO NOT call dotenv here if server loads it at entry; ok to keep though
const inputValidation = require("../validation/inputValidation");
const User = require("../Models/user"); // make sure folder is 'models' not 'Models'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const validated = inputValidation.safeParse({ email, password });
  if (!validated.success) return res.status(400).json({ errors: validated.error.errors });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists, please login" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validated = inputValidation.safeParse({ email, password });
    if (!validated.success) return res.status(400).json({ errors: validated.error.errors });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).json({ message: "Invalid email or password" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const userId = user._id.toString();
    const token = jwt.sign({ userId}, secret, { expiresIn: '1h' });
    return res.status(200).json({ message: "Login successful", token, userId });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = { registerUser, loginUser };

const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator"); // Import zod schemas

// Home page logic
const home = async (req, res, next) => {
  try {
    res.status(200).send("Welcome to home page");
  } catch (error) {
    next(error); // Pass the error to the error middleware
  }
};

// Register logic
const register = async (req, res, next) => {
  try {
    console.log("Register data:", req.body);

    // Validate request body using zod
    const validatedData = registerSchema.parse(req.body); // Throws if validation fails

    const { username, email, phone, password } = validatedData;

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // Hash the password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    // Create token
    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id.toString(),
    });
  } catch (error) {
    next(error); // Pass the error to the error middleware
  }
};

// Login logic
const login = async (req, res, next) => {
  try {
    // Validate login input using zod
    const validatedData = loginSchema.parse(req.body); // Throws if validation fails

    const { email, password } = validatedData;

    console.log("Login attempt:", email);

    // Check if user exists
    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw { status: 400, message: "Invalid credentials!" }; // Throw error to be handled by the middleware
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      throw { status: 401, message: "Invalid email or password!" }; // Throw error to be handled by the middleware
    }

    // Create token

    const token = jwt.sign(
      {
        userId: userExist._id.toString(),
        email: userExist.email,
        isAdmin: userExist.isAdmin,
        username: userExist.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Use true in production with HTTPS
      sameSite: "Strict", // Or "Lax" for less strict CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      msg: "Login successful",
      token,
      userId: userExist._id.toString(),
      isAdmin: userExist.isAdmin,
    });
  } catch (error) {
    next(error); // Pass the error to the error middleware
  }
};

// user logic to send data

const user = async (req, res) => {
  try {
    const userData = req.user; // this comes from middleware
    console.log("User data from token:", userData);

    res.status(200).json({ userData });
  } catch (error) {
    console.error("User Controller Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, user };

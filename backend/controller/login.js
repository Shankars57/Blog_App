import jwt from "jsonwebtoken";
import {loginCredModel} from "../models/Blog.js"; // Consider renaming to User.js
import bcrypt from "bcryptjs";

const JWT_SECRET = "1234567890"; // Replace with env variable in production

// REGISTER CONTROLLER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await loginCredModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email must be valid" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new loginCredModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await loginCredModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

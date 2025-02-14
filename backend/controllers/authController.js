import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;
  const profileImage = req.file ? req.file.path : "";

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    gender,
    email,
    password: hashedPassword,
    profileImage,
  });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  user.resetToken = resetToken;
  await user.save();

  res.json({ message: "Password reset link sent to email" });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = "";
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
};

module.exports = { register, login, forgotPassword, resetPassword, getUser };

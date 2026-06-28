import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";
import User from "../models/User.js";

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required.");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = signToken(user._id);
  res.status(201).json({
    success: true,
    data: { token, user: { id: user._id, name: user.name, email: user.email } },
  });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = signToken(user._id);
  res.status(200).json({
    success: true,
    data: { token, user: { id: user._id, name: user.name, email: user.email } },
  });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  // Stateless JWT — logout is handled client-side by discarding the token.
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
});

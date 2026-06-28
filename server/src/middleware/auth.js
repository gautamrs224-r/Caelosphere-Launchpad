import { verifyToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized. Missing or malformed token.");
  }

  const token = header.split(" ")[1];
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new ApiError(401, "Not authorized. Invalid or expired token.");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "Not authorized. User no longer exists.");
  }

  req.user = user;
  next();
});

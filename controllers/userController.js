// Description: All user related functions are implemented here.
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/token.js";

// User registration
export const registerUser = async (request, h) => {
  const { username, password } = request.payload;

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return h
      .response({ success: false, message: "User already exists", data: null })
      .code(409); // Conflict status code
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword });
    generateTokenAndSetCookie({ id: user.id, username: user.username }, h);

    return h
      .response({
        success: true,
        message: "User registered successfully",
        data: user,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        success: false,
        message: "User registration failed",
        data: null,
      })
      .code(400);
  }
};

// User login
export const loginUser = async (request, h) => {
  // Check if request payload is present and has required fields
  const { username, password } = request.payload || {};

  if (!username || !password) {
    return h
      .response({
        success: false,
        message: "Username and password are required",
        data: null,
      })
      .code(400); // Bad Request
  }

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return h
      .response({ success: false, message: "Invalid credentials", data: null })
      .code(401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return h
      .response({ success: false, message: "Invalid credentials", data: null })
      .code(401);
  }

  generateTokenAndSetCookie({ id: user.id, username: user.username }, h);

  return h
    .response({ success: true, message: "Login successful", data: user })
    .code(200);
};

// User logout
export const logoutUser = async (request, h) => {
  h.unstate("token");
  return h
    .response({ success: true, message: "Logout successful", data: null })
    .code(200);
};

// Get user details
export const getUserDetails = async (request, h) => {
  const user = request.user;
  return h.response({
    success: true,
    message: "You have accessed a protected route.",
    data: user,
  });
};

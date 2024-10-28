import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// Function to generate JWT token and set it as a cookie
export const generateTokenAndSetCookie = (user, h) => {
  const token = jwt.sign({ data: user }, JWT_SECRET, {
    expiresIn: "1y",
  });

  h.state("token", token, {
    isSecure: true, // Set true if using HTTPS
    isHttpOnly: true, // Set true to prevent client-side access
    path: "/", // The path where the cookie is valid
    ttl: 365 * 24 * 60 * 60 * 1000, // Time to live in micro seconds (1 year)
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

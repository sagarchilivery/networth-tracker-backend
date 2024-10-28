// Verifies the token sent by the client and attaches the decoded user information to the request object.

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = (request, h) => {
  // Get the token from the header or cookie
  const token =
    request.headers.authorization?.split(" ")[1] || request.state.token;

  if (!token) {
    return h
      .response({
        success: false,
        message: "Access denied. No token provided.",
      })
      .code(403) // Forbidden
      .takeover(); // Prevent further handling
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET); // Use your secret key here
    request.user = decoded; // Attach the decoded user information to the request
    return h.continue; // Proceed to the next handler
  } catch (error) {
    console.log("error: ", error);
    return h.response({ success: false, message: "Invalid token." }).code(401); // Unauthorized
  }
};

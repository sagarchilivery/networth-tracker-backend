// Description: User routes for the application.

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import Joi from "joi";

// Define Joi validation schemas
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Validation middleware
const validateSignup = (request, h) => {
  const { error } = signupSchema.validate(request.payload);
  if (error) {
    return h.response({ error: error.details[0].message }).code(400).takeover();
  }
  return h.continue;
};

const validateLogin = (request, h) => {
  const { error } = loginSchema.validate(request.payload);
  if (error) {
    return h.response({ error: error.details[0].message }).code(400).takeover();
  }
  return h.continue;
};

const userRoutes = [
  {
    method: "POST",
    path: "/signup",
    options: {
      pre: [validateSignup], // Add validation middleware
    },
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/signin",
    options: {
      pre: [validateLogin], // Add validation middleware
    },
    handler: loginUser,
  },
  {
    method: "POST",
    path: "/signout",
    handler: logoutUser,
  },
  {
    method: "GET", // Example route requiring authentication
    path: "/user-details",
    options: {
      pre: [verifyToken], // Add the authenticate middleware
    },
    handler: getUserDetails,
  },
];

export default userRoutes;

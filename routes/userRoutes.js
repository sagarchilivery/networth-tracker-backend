// Description: User routes for the application.

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRoutes = [
  {
    method: "POST",
    path: "/signup",
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/signin",
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

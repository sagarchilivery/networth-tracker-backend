import {
  getAadharNumber,
  saveAadharNumber,
} from "../controllers/piiController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const piiRoutes = [
  {
    method: "GET",
    path: "/aadhar-number",
    options: {
      pre: [verifyToken],
    },
    handler: getAadharNumber,
  },
  {
    method: "POST",
    path: "/aadhar-number",
    options: {
      pre: [verifyToken],
    },
    handler: saveAadharNumber,
  },
];

export default piiRoutes;

import {
  getAadharNumber,
  saveAadharNumber,
} from "../controllers/piiController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import Joi from "joi";

// Define Joi validation schema for Aadhaar number
const aadharSchema = Joi.object({
  aadharNumber: Joi.number()
    .integer()
    .min(100000000000) // Minimum value for a 12-digit number
    .max(999999999999) // Maximum value for a 12-digit number
    .required()
    .messages({
      "number.base": '"aadharNumber" must be a number',
      "number.integer": '"aadharNumber" must be an number',
      "number.min": '"aadharNumber" must be a 12-digit number',
      "number.max": '"aadharNumber" must be a 12-digit number',
      "any.required": '"aadharNumber" is required',
    }),
});
// Validation middleware for saving Aadhaar number
const validateAadhar = (request, h) => {
  const { error } = aadharSchema.validate(request.payload);
  if (error) {
    return h.response({ error: error.details[0].message }).code(400).takeover();
  }
  return h.continue;
};

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
      pre: [verifyToken, validateAadhar],
    },
    handler: saveAadharNumber,
  },
];

export default piiRoutes;

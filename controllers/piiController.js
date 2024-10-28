// controllers/piiController.js

import PII from "../models/piiModel.js";
import { ENCRYPTION_KEY } from "../config.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr(ENCRYPTION_KEY);

// Save Aadhaar number
export const saveAadharNumber = async (request, h) => {
  const { aadharNumber } = request.payload;
  const userId = request?.user?.data?.id;

  // Check if Aadhaar number is a string of digits
  if (!/^\d+$/.test(aadharNumber)) {
    return h
      .response({
        success: false,
        message: "Aadhaar number must be a valid number.",
      })
      .code(400);
  }

  try {
    // Encrypt the Aadhaar number using Cryptr
    const encryptedAadhar = cryptr.encrypt(aadharNumber.toString());

    // Check if the user's Aadhaar record already exists
    const existingPII = await PII.findOne({ where: { userId } });

    if (existingPII) {
      return h
        .response({
          success: false,
          message: "Aadhaar number already exists for this user.",
        })
        .code(409); // Conflict
    }

    // Save the new encrypted Aadhaar number
    const pii = await PII.create({
      aadharNumber: encryptedAadhar,
      userId,
    });

    return h
      .response({ success: true, message: "Aadhaar number saved", data: pii })
      .code(201);
  } catch (error) {
    console.log("error: ", error);
    return h
      .response({
        success: false,
        message: "Error saving Aadhaar number",
        data: null,
      })
      .code(400);
  }
};

// Retrieve Aadhaar number
export const getAadharNumber = async (request, h) => {
  const userId = request?.user?.data?.id;

  try {
    const pii = await PII.findOne({
      where: { userId },
      attributes: ["aadharNumber"],
    });
    if (!pii) {
      return h
        .response({
          success: false,
          message: "No Aadhaar number found",
          data: null,
        })
        .code(404);
    }

    // Decrypt the Aadhaar number using Cryptr
    const decryptedAadharNumber = cryptr.decrypt(pii.aadharNumber);

    return h
      .response({
        success: true,
        message: "Retrieved Successfully",
        data: { aadharNumber: decryptedAadharNumber },
      })
      .code(200);
  } catch (error) {
    console.log("error: ", error);
    return h
      .response({
        success: false,
        message: "Error retrieving Aadhaar number",
        data: null,
      })
      .code(500);
  }
};

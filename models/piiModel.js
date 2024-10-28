// models/piiModel.js

// import Sequelize from "sequelize";
// import { sequelize } from "../config.js";
// import bcrypt from "bcryptjs";

// const PII = sequelize.define("PII", {
//   aadharNumber: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     // Storing encrypted Aadhar numbers
//     set(value) {
//       const encryptedValue = bcrypt.hashSync(value, 10); // Encrypt using bcrypt
//       this.setDataValue("aadharNumber", encryptedValue);
//     },
//     get() {
//       return this.getDataValue("aadharNumber"); // You might want to decrypt or just retrieve it as needed
//     },
//   },
// });

// // Establish relationship in User model (see below for details)
// export default PII;

// models/piiModel.js

// import Sequelize from "sequelize";
// import { sequelize } from "../config.js";
// import bcrypt from "bcryptjs";

// const PII = sequelize.define("PII", {
//   aadharNumber: {
//     type: Sequelize.STRING, // Store hashed Aadhaar as a string
//     allowNull: false,
//     set(value) {
//       // Convert Aadhaar number to string before hashing to avoid bcrypt errors
//       const hashedValue = bcrypt.hashSync(value.toString(), 10); // Hash using bcrypt
//       this.setDataValue("aadharNumber", hashedValue);
//     },
//   },
// });

// export default PII;

import Sequelize from "sequelize";
import { sequelize } from "../config.js";
import crypto from "crypto";

const encryptionKey = "12345678901234567890123456789012"; // Use a 32-byte key
const iv = crypto.randomBytes(16); // Initialization vector

const PII = sequelize.define("PII", {
  aadharNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    // set(value) {
    //   const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
    //   let encrypted = cipher.update(value.toString(), "utf8", "hex");
    //   encrypted += cipher.final("hex");
    //   this.setDataValue("aadharNumber", encrypted + ":" + iv.toString("hex"));
    // },
    // get() {
    //   const [encryptedData, ivHex] =
    //     this.getDataValue("aadharNumber").split(":");
    //   const decipher = crypto.createDecipheriv(
    //     "aes-256-cbc",
    //     encryptionKey,
    //     Buffer.from(ivHex, "hex")
    //   );
    //   let decrypted = decipher.update(encryptedData, "hex", "utf8");
    //   decrypted += decipher.final("utf8");
    //   return decrypted;
    // },
  },
});

export default PII;

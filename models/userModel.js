// Purpose: Define the User model for the database.

import Sequelize from "sequelize";
import { sequelize } from "../config.js";
import PII from "./piiModel.js";

const User = sequelize.define("User", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define one-to-one relationship
User.hasOne(PII, {
  foreignKey: "userId",
  as: "pii", // Allows for eager loading as "pii"
});

PII.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default User;

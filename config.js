// Purpose: Configuration for the database connection

import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "12345678901234567890123456789012";
export const sequelize = new Sequelize(process.env.DB_URI);
export const PORT = process.env.PORT || 1337;
export const JWT_SECRET = process.env.JWT_SECRET || "Luckiest Person on Earth";

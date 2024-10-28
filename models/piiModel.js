// models/piiModel.js

import Sequelize from "sequelize";
import { sequelize } from "../config.js";


const PII = sequelize.define("PII", {
  aadharNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default PII;

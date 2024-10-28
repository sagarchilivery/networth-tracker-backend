// Description: Main entry point for the server. Initializes the Hapi server, registers routes, and starts the server.
import dotenv from "dotenv";
dotenv.config();
import Hapi from "@hapi/hapi";
import userRoutes from "./routes/userRoutes.js";
import { PORT, sequelize } from "./config.js";
import morgan from "morgan";
import piiRoutes from "./routes/piiRoutes.js";

// Initialize Hapi server
const server = Hapi.server({
  port: PORT,
  host: "localhost",
});

// Function to create tables
const initDB = async () => {
  await sequelize.sync();
};

// health route
server.route({
  method: "GET",
  path: "/health-check",
  handler: (request, h) => {
    return h.response({ status: "OK" });
  },
});

// User routes
server.route(userRoutes);
server.route(piiRoutes);

server.ext("onPreHandler", (request, h) => {
  morgan("dev")(request.raw.req, request.raw.res, () => {});
  return h.continue;
});

// Start the server
const startServer = async () => {
  await initDB();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});

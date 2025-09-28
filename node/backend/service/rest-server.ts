import logger from "@config/logger";
import { SERVER_PORT } from "@config/ports";
import express from "express";
import { Server } from "http";

const server = express();
server.use(express.json());

let httpServer: Server | null = null;

server.get("/", (req, res) => {
  res.send("Twitch EventSub service running!");
});

export async function startServer() {
  httpServer = server.listen(SERVER_PORT, async () => {
    logger.info(`Server started on port ${SERVER_PORT}`);
  });
}

export function stopServer() {
  if (httpServer) {
    httpServer.close(() => {
      logger.info("Server stopped");
    });
    httpServer = null;
  } else {
    logger.info("Server is not running.");
  }
}

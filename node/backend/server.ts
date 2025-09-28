import logger from "@config/logger";
import { SERVER_PORT } from "@config/ports";
import { listener, receiveEventSub } from "@provider/eventsub";
import express from "express";
import { Server } from "http";

const server = express();
server.use(express.json());

let httpServer: Server | null = null;

// Webhook endpoint for Twitch EventSub
server.post("/eventsub", function (req, res) {
  receiveEventSub(req, res);
});

server.get("/", (req, res) => {
  res.send("Twitch EventSub service running!");
});

export async function startServer(
  token: string
  // streamerName: string = "nanoda_ch"
) {
  httpServer = server.listen(SERVER_PORT, async () => {
    listener(token);
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

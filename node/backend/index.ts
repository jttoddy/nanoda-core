import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

import * as server from "./server";
import logger from "@config/logger";
import { TwitchChatConnection } from "@provider/chat-webhook";
import { getTwitchAccessToken } from "./provider/oauth";
import { receiveMessage } from "./chat";
import { startWebSocketServer, stopWebSocketServer } from "./websocket-server";

let chat: TwitchChatConnection;

/**
 * Initializes and starts all core backend services:
 * - Launches the WebSocket server on port 8080.
 * - Retrieves a Twitch access token asynchronously.
 * - Starts the main server using the obtained access token.
 * - Establishes a Twitch chat connection for the "nanoda_ch" channel,
 *   setting up message publishing via the `receiveMessage` handler.
 * - Connects to the Twitch chat.
 *
 * @async
 * @returns {Promise<void>} Resolves when all services are started and connected.
 */
async function startEverything() {
  logger.info("Starting WebSocket server on port 8080");
  startWebSocketServer(8080);
  logger.info("Requesting Twitch access token...");
  const token = await getTwitchAccessToken();
  logger.info("Starting HTTP server...");
  await server.startServer(token.access_token);
  logger.info("Connecting to Twitch chat...");
  chat = new TwitchChatConnection("nanoda_ch", "nanoda_ch", {
    publish: receiveMessage,
  });
  await chat.connect();
  logger.info("Twitch chat connected.");
}

const gracefulShutdown = async () => {
  logger.info("Shutting down WebSocket server...");
  stopWebSocketServer();
  logger.info("Shutting down HTTP server...");
  server.stopServer();
  if (chat) {
    logger.info("Disconnecting from Twitch chat...");
    await chat.disconnect();
  }
  logger.info("Shutdown complete. Exiting process.");
  process.exit();
};

startEverything();
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

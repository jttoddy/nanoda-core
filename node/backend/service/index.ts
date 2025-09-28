import * as server from "@service/rest-server";
import logger from "@config/logger";
import {
  startWebSocketServer,
  stopWebSocketServer,
} from "@service/websocket-server";
import { irc } from "./chat";
import {
  EventSubClient,
  EventSubProvider,
  StartsEventSubWsListener,
} from "@provider/eventsub";
import {
  createRaidListeners,
  createSubscriptionListeners,
} from "@provider/eventsub/behaviour/subscribe";

let eventSub: (EventSubClient & StartsEventSubWsListener) | null = null;

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
async function startEverything(
  userId: string = "nanoda_ch",
  websocketServerPort: number = 8080
): Promise<void> {
  logger.info(`Starting WebSocket server on port ${websocketServerPort}`);
  startWebSocketServer(websocketServerPort);

  logger.info("Starting HTTP server...");
  await server.startServer();

  logger.info("Connecting to IRC Twitch chat...");
  await irc.connectToChat();
  logger.info("Twitch chat connected.");

  logger.info("Starting EventSub WebSocket listener...");
  eventSub = new EventSubProvider();
  await eventSub.start();
  logger.info("EventSub WebSocket listener started.");
  if (!eventSub.wsListener) {
    throw new Error("EventSub WebSocket listener not initialized");
  }
  createSubscriptionListeners(eventSub.wsListener);
  createRaidListeners(eventSub.wsListener, userId);
}

async function gracefulShutdown() {
  await eventSub?.stop();
  logger.info("Shutting down WebSocket server...");
  stopWebSocketServer();
  logger.info("Shutting down HTTP server...");
  server.stopServer();
  logger.info("Shutdown complete. Exiting process.");
  process.exit();
}

export function start() {
  startEverything();
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
}

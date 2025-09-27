import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

import * as server from "./server";
import { TwitchChatConnection } from "./provider/chat-webhook";
import { getTwitchAccessToken } from "./provider/oauth";
import { receiveMessage } from "./chat";

let chat: TwitchChatConnection;

(async () => {
  const token = await getTwitchAccessToken();
  await server.startServer(token);
  chat = new TwitchChatConnection("nanoda_ch", "nanoda_ch", {
    publish: receiveMessage,
  });
  await chat.connect();
})();

// Graceful shutdown

process.on("SIGINT", async () => {
  server.stopServer();
  await chat.disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  server.stopServer();
  await chat.disconnect();
  process.exit();
});

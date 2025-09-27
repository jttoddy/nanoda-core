import * as server from "./server";
import * as chat from "./provider/chat-webhook";

server.startServer();
chat.connectTwitchChat();

// Graceful shutdown

process.on("SIGINT", () => {
  server.stopServer();
  chat.disconnectTwitchChat();
  process.exit();
});

process.on("SIGTERM", () => {
  server.stopServer();
  chat.disconnectTwitchChat();
  process.exit();
});

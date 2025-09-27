import * as server from "./server";

server.startServer();

process.on("SIGINT", () => {
  server.stopServer();
  process.exit();
});

process.on("SIGTERM", () => {
  server.stopServer();
  process.exit();
});

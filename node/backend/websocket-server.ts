import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import type { ChatMessage } from "./chat/ChatMessage";

const server = createServer();
const wss = new WebSocketServer({ server });

// Store all connected clients
const clients = new Set<WebSocket>();

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

// Broadcast a chat message to all clients
export function broadcastChatMessage(msg: ChatMessage) {
  const payload = JSON.stringify({ event: "twitch.chat.message", data: msg });
  for (const client of clients) {
    if (client.readyState === client.OPEN) {
      client.send(payload);
    }
  }
}

// Start the HTTP/WebSocket server
export function startWebSocketServer(port = 8080) {
  server.listen(port, () => {
    console.log(`[ws] WebSocket server listening on ws://localhost:${port}`);
  });
}

// Optionally, export a stop function
export function stopWebSocketServer() {
  wss.close();
  server.close();
}

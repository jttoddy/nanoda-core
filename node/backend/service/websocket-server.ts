import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import type { ChatMessage } from "../chat/ChatMessage";

const server = createServer();
const wss = new WebSocketServer({ server });

// Store all connected clients
const clients = new Set<WebSocket>();

// Store a rolling buffer of the last 50 messages so new clients can catch up on connection
const messageBuffer: ChatMessage[] = [];
const MAX_BUFFER_SIZE = 50;

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));

  // Send the message buffer to the newly connected client
  for (const msg of messageBuffer) {
    ws.send(JSON.stringify({ event: "twitch.chat.message", data: msg }));
  }
});

// Broadcast a chat message to all clients
export function broadcastChatMessage(msg: ChatMessage) {
  const payload = JSON.stringify({ event: "twitch.chat.message", data: msg });
  // Write ChatMessage to buffer
  messageBuffer.push(msg);
  if (messageBuffer.length > MAX_BUFFER_SIZE) {
    messageBuffer.shift();
  }
  // Broadcast to all connected clients
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
  // Terminate all active WebSocket connections
  for (const client of clients) {
    client.terminate();
  }
  wss.close();
  server.close();
  // Clear the message buffer
  messageBuffer.length = 0;
}

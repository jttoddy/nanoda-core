import express from "express";
import { Server } from "http";

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());

// Webhook endpoint for Twitch EventSub
server.post("/eventsub", (req, res) => {
  // Handle Twitch EventSub verification
  if (req.body.challenge) {
    return res.status(200).send(req.body.challenge);
  }
  // Handle chat message events
  if (
    req.body.subscription &&
    req.body.subscription.type === "channel.chat.message" &&
    req.body.event
  ) {
    const event = req.body.event;
    const user = event.chatter_user_name || event.user_name || "unknown";
    const message = event.message?.text || event.message || "";
    const channel = event.broadcaster_user_name || event.channel || "unknown";
    console.log(`[Twitch Chat] #${channel} <${user}>: ${message}`);
  }
  res.sendStatus(200);
});

server.get("/", (req, res) => {
  res.send("Twitch EventSub service running!");
});

let httpServer: Server | null = null;

export async function startServer(
  token: string
  // streamerName: string = "nanoda_ch"
) {
  httpServer = server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
      if (token) {
        // await subscribeToChatMessages(streamerName, token);
        // console.log("Subscribed to chat messages!");
      } else {
        console.error("Failed to obtain Twitch access token.");
      }
    } catch (err) {
      console.error("Failed to subscribe to EventSub:", err);
    }
  });
}

export function stopServer() {
  if (httpServer) {
    httpServer.close(() => {
      console.log("Server stopped");
    });
    httpServer = null;
  } else {
    console.log("Server is not running.");
  }
}

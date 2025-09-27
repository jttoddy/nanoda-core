// --- Twitch Chat via WebSockets (tmi.js) ---
import tmi from "tmi.js";
import { ChatMessage } from "../chat/ChatMessage";

const TWITCH_CHAT_MESSAGE_EVENT = "twitch.chat.message";

export class TwitchChatConnection {
  private tmiClient: tmi.Client;
  private bus: { publish: (event: string, data: ChatMessage) => void };

  constructor(
    user: string = "nanoda_ch",
    channel: string = "nanoda_ch",
    bus: { publish: (event: string, data: ChatMessage) => void },
    token?: string
  ) {
    this.bus = bus;
    this.tmiClient = token
      ? authorizedClient(channel, token, user)
      : anonymousClient(channel);

    this.tmiClient.on(
      "message",
      (
        channel: string,
        tags: tmi.ChatUserstate,
        message: string,
        self: boolean
      ) => {
        if (self) return; // Ignore messages from the bot itself
        // Publish the message event to the bus
        this.bus.publish(TWITCH_CHAT_MESSAGE_EVENT, {
          channel,
          tags,
          message,
          self,
        });
      }
    );
  }

  async connect() {
    try {
      await this.tmiClient.connect();
    } catch (error) {
      console.error("Failed to connect to Twitch Chat:", error);
    }
  }

  async disconnect() {
    if (!this.tmiClient || this.tmiClient.readyState() === "CLOSED") {
      console.log("Twitch Chat is already disconnected or not initialized.");
      return;
    }
    try {
      await this.tmiClient.disconnect();
      console.log("Disconnected from Twitch Chat");
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  }
}

// Helper function for anonymous (read-only) connection
function anonymousClient(channel: string) {
  return new tmi.Client({
    channels: [channel],
    options: { debug: true },
    connection: { reconnect: true, secure: true },
  });
}

// Helper function for authorized connection
function authorizedClient(channel: string, token: string, user: string) {
  return new tmi.Client({
    channels: [channel],
    options: { debug: true },
    connection: { reconnect: true, secure: true },
    identity: {
      username: user,
      password: `oauth:${token}`,
    },
  });
}

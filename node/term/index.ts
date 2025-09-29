import { z } from "zod";

import tmi from "tmi.js";
import { addChatMessage, createInterface } from "chat";

type UserTags = tmi.ChatUserstate;

// Subscribe to backend wss localhost:8080
const ws = new WebSocket("ws://localhost:8080");

interface ChatMessage {
  channel: string;
  tags: UserTags;
  message: string;
  self: boolean;
}

// Zod schema for ChatMessage
export const ChatMessageSchema = z.object({
  channel: z.string(),
  tags: z.unknown(), // UserTags is tmi.ChatUserstate, which is a complex object; use unknown or refine as needed
  message: z.string(),
  self: z.boolean(),
});

ws.onmessage = (event) => {
  const result = ChatMessageSchema.safeParse(event.data);
  if (result.success) {
    const chatMessage = result.data;
    const tags = chatMessage.tags as Record<string, unknown>;
    addChatMessage(
      `${typeof tags["display-name"] === "string" ? tags["display-name"] : "Unknown"}: ${chatMessage.message}`
    );
  }
};

// Start the terminal chat interface
createInterface();

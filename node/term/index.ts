import { z, ZodError } from "zod";
import { addChatMessage, createInterface } from "./chat";

// Subscribe to backend wss localhost:8080
const ws = new WebSocket("ws://localhost:8080");

// Zod schema for ChatMessage
export const ChatMessageSchema = z.object({
  event: z.literal("twitch.chat.message"),
  data: z.object({
    channel: z.string(),
    tags: z.record(z.string(), z.unknown()), // Accepts any object with string keys
    message: z.string(),
    self: z.boolean(),
  }),
});
let knownError: ZodError | null = null;
ws.onmessage = (event: MessageEvent<string>) => {
  const result = ChatMessageSchema.parse(
    event.data ? JSON.parse(event.data) : {}
  );
  const message = result.data;
  addChatMessage(
    `[${message.tags.displayName || "unknown"}] ${message.message}`
  );
};

// Start the terminal chat interface
createInterface();

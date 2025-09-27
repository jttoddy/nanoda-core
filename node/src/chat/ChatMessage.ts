import tmi from "tmi.js";

export type UserTags = tmi.ChatUserstate;
export type ChatMessage = {
  channel: string;
  tags: UserTags;
  message: string;
  self: boolean;
};

// Formats ChatMessage into a string for logging or display
export function formatChatMessage(msg: ChatMessage): string {
  const username = msg.tags["display-name"] || msg.tags.username || "unknown";
  return `[${msg.channel}] <*${username}*>: ${msg.message}`;
}
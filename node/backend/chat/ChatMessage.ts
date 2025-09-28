import tmi from "tmi.js";

export type UserTags = tmi.ChatUserstate;
/**
 * Represents a chat message within a specific channel.
 *
 * @property channel - The name or identifier of the chat channel.
 * @property tags - The user tags associated with the message sender.
 * @property message - The content of the chat message.
 * @property self - Indicates if the message was sent by the current user.
 */
export interface ChatMessage {
  channel: string;
  tags: UserTags;
  message: string;
  self: boolean;
}

// Formats ChatMessage into a string for logging or display
/**
 * Formats a chat message into a readable string, including the channel and the display name of the user.
 *
 * @param msg - The chat message object containing message details and user tags.
 * @returns A formatted string in the form: `[channel] <*username*>: message`.
 */
export function formatChatMessage(msg: ChatMessage): string {
  const username = msg.tags["display-name"] || msg.tags.username || "unknown";
  return `[${msg.channel}] <*${username}*>: ${msg.message}`;
}

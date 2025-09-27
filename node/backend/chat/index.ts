import { broadcastChatMessage } from "../websocket-server";
import { ChatMessage, formatChatMessage } from "./ChatMessage";

export function receiveMessage(msg: string, data: ChatMessage) {
  console.log(formatChatMessage(data));
  broadcastChatMessage(data);
}

import logger from "../config/logger";
import { broadcastChatMessage } from "../service/websocket-server";
import { ChatMessage, formatChatMessage } from "./ChatMessage";

/**
 * Handles an incoming chat message by formatting and broadcasting it.
 *
 * @param msg - The raw message string received.
 * @param data - The structured chat message data to be processed.
 */
export function receiveMessage(msg: string, data: ChatMessage) {
  logger.info(formatChatMessage(data));
  broadcastChatMessage(data);
}

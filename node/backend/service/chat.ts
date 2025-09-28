import { ChatMessage } from "@chat/ChatMessage";
import logger from "@config/logger";
import { TwitchChatConnection } from "@provider/chat-webhook";
import { receiveMessage as handler } from "@chat/index";

export interface ConnectsToChat {
  connectToChat: () => Promise<void>;
}

class ChatService implements ConnectsToChat {
  // initialiser that accepts a string value as a parameter
  constructor(
    userName: string = "nanoda_ch",
    channelName: string = "nanoda_ch",
    receiveMessage: (msg: string, data: ChatMessage) => void
  ) {
    this.chat = new TwitchChatConnection(userName, channelName, {
      publish: receiveMessage,
    });
  }

  private chat: TwitchChatConnection | null = null;

  async connectToChat() {
    if (!this.chat) {
      throw new Error("ChatService not initialized with chat connection.");
    }
    logger.info("Connecting to Twitch chat...");
    await this.chat.connect();
    logger.info("Twitch chat connected.");
  }
}

export default new ChatService(
  "nanoda_ch",
  "nanoda_ch",
  handler
) as ConnectsToChat;

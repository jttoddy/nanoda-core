import { ChatMessage } from "@chat/ChatMessage";
import logger from "@config/logger";
import { TwitchChatConnection } from "@provider/chat-webhook";
import { receiveMessage as handler } from "@chat/index";

const DEFAULT_CHANNEL = "nanoda_ch";

export interface ConnectsToChat {
  connectToChat: () => Promise<void>;
}

class IRCChatService implements ConnectsToChat {
  // initialiser that accepts a string value as a parameter
  constructor(
    channelName: string = DEFAULT_CHANNEL,
    receiveMessage: (msg: string, data: ChatMessage) => void
  ) {
    this.chat = new TwitchChatConnection(undefined, channelName, {
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

export const irc = new IRCChatService(
  DEFAULT_CHANNEL,
  handler
) as ConnectsToChat;

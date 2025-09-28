import { EventSubWsListener } from "@twurple/eventsub-ws";
import { ApiClient } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import logger from "@config/logger";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_TOKEN } from "@config/twitch";

export class EventSubProvider {
  private wsListener: EventSubWsListener | null = null;
  private apiClient: ApiClient | null = null;

  async start() {
    const authProvider = new AppTokenAuthProvider(
      TWITCH_CLIENT_ID,
      TWITCH_CLIENT_TOKEN
    );
    this.apiClient = new ApiClient({ authProvider });

    this.wsListener = new EventSubWsListener({ apiClient: this.apiClient });
    await this.wsListener.start();

    logger.info("EventSub WebSocket listener started");
  }

  async stop() {
    if (this.wsListener) {
      await this.wsListener.stop();
      this.wsListener = null;
      logger.info("EventSub WebSocket listener stopped");
    }
  }
}

import logger from "@config/logger";
import { EventSubApiClient } from "..";
import {
  createEventSubscription,
  EventSubRequest,
  EventSubRequestType,
} from "../behaviour/subscribe";

type HandlesEventSubSubscriptions = {
  create: (
    req: EventSubRequest<EventSubRequestType.ChannelSubscribe>
  ) => Promise<void>;
  delete: (id: string) => Promise<void>;
  get: () => Promise<string[]>;
};

export function handleSubscriptions(
  api: EventSubApiClient
): HandlesEventSubSubscriptions {
  return {
    async create(req) {
      logger.info(`Creating subscription: ${JSON.stringify(req)}`);
      if (!api.apiClient) {
        throw new Error("API client not initialized");
      }
      const subscription = createEventSubscription(api.apiClient);
      try {
        const result = await subscription(req);
        logger.info(`Subscription created: ${JSON.stringify(result)}`);
      } catch (error) {
        logger.error(`Failed to create subscription: ${error}`);
        throw error;
      }
    },
    async delete(id) {
      logger.info(`Deleting subscription with ID: ${id}`);
      if (!api.apiClient) {
        throw new Error("API client not initialized");
      }
    },
    async get() {
      logger.info("Fetching all subscriptions");
      if (!api.apiClient) {
        throw new Error("API client not initialized");
      }
      return []; // Placeholder, should return actual subscription IDs
    },
  };
}

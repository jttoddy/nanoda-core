import * as es from "@provider/eventsub";
import { createSubscriptionListeners } from "@provider/eventsub/behaviour/es-subscriptions";
import logger from "@config/logger";
import { createRaidListeners } from "@provider/eventsub/behaviour/raid";
import { createFollowListeners } from "@provider/eventsub/behaviour/follow";

let eventSub: (es.EventSubClient & es.StartsEventSubWsListener) | null = null;

export async function startEventSub(): Promise<void> {
  logger.info("Starting EventSub WebSocket listener...");
  eventSub = new es.EventSubProvider();
  await eventSub.start();
  logger.info("EventSub WebSocket listener started.");
}

export async function stopEventSub(): Promise<void> {
  if (eventSub) {
    await eventSub.stop();
    eventSub = null;
    logger.info("EventSub WebSocket listener stopped.");
  }
}

function getWsListener() {
  if (!eventSub || !eventSub.wsListener) {
    throw new Error("EventSub WebSocket listener not initialized");
  }
  return eventSub.wsListener;
}

export function listenToEventSubSubscriptionEvents() {
  createSubscriptionListeners(getWsListener())({
    onSubscriptionCreateSuccess: (event, sub) => {
      logger.info(`Subscription created: ${sub.id}`);
    },
    onSubscriptionCreateFailure: (sub, error) => {
      logger.error(
        `Subscription creation failed: ${sub.id} - ${error.message}`
      );
    },
    onSubscriptionDeleteSuccess: (sub) => {
      logger.info(`Subscription deleted: ${sub.id}`);
    },
    onSubscriptionDeleteFailure: (sub, error) => {
      logger.error(
        `Subscription deletion failed: ${sub.id} - ${error.message}`
      );
    },
  });
}

export function listenToRaidEvents() {
  createRaidListeners(getWsListener())({
    onRaid: (channel, event) => {
      logger.info(
        `Raid event on channel ${channel}: from ${event.raidDisplayName} with ${event.viewers} viewers`
      );
    },
  });
}

export function listenToFollowEvents() {
  createFollowListeners(
    getWsListener(),
    "nanoda_ch",
    "nanoda_ch"
  )({
    onFollow: (channel, event) => {
      logger.info(
        `New follower on channel ${channel}: ${event.userDisplayName}`
      );
    },
  });
}

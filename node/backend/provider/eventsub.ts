import axios from "axios";
import { CALLBACK_URL, TWITCH_CLIENT_ID } from "@config/twitch";
import express from "express";
import logger from "@config/logger";
import { SERVER_PORT } from "@config/ports";

// Subscribe to EventSub for chat messages
export async function subscribeToChatMessages(
  broadcasterUserId: string,
  twitchAccessToken: string
) {
  await axios.post(
    "https://api.twitch.tv/helix/eventsub/subscriptions",
    {
      type: "channel.chat.message",
      version: "1",
      condition: { broadcaster_user_id: broadcasterUserId },
      transport: {
        method: "webhook",
        callback: CALLBACK_URL,
        secret: "your_webhook_secret",
      },
    },
    {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${twitchAccessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export function receiveEventSub(req: express.Request, res: express.Response) {
  // Handle Twitch EventSub verification
  if (req.body.challenge) {
    return res.status(200).send(req.body.challenge);
  }
  // Handle chat message events
  if (
    req.body.subscription &&
    req.body.subscription.type === "channel.chat.message" &&
    req.body.event
  ) {
    const event = req.body.event;
    const user = event.chatter_user_name || event.user_name || "unknown";
    const message = event.message?.text || event.message || "";
    const channel = event.broadcaster_user_name || event.channel || "unknown";
    logger.info(`[Twitch Chat] #${channel} <${user}>: ${message}`);
  }
  res.sendStatus(200);
}

export function listener(token: string) {
  logger.info(`Server running on port ${SERVER_PORT}`);
  try {
    if (token) {
      // await subscribeToChatMessages(streamerName, token);
      // logger.info("Subscribed to chat messages!");
    } else {
      logger.error("Failed to obtain Twitch access token.");
    }
  } catch (err) {
    logger.error({ err }, "Failed to subscribe to EventSub");
  }
}

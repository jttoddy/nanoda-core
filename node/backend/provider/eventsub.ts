import axios from "axios";
import { CALLBACK_URL, TWITCH_CLIENT_ID } from "../config/twitch";

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

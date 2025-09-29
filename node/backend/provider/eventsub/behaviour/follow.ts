import { EventSubWsListener } from "@twurple/eventsub-ws";
import { EventSubChannelFollowEvent } from "@twurple/eventsub-base";

export interface FollowEventListeners {
  onFollow: (channel: string, event: EventSubChannelFollowEvent) => void;
}

export function createFollowListeners(
  ws: EventSubWsListener,
  channel: string,
  mod?: string
): (listeners: FollowEventListeners) => void {
  return (listeners: FollowEventListeners) => {
    ws.onChannelFollow(channel, mod ?? channel, (event) => {
      console.log(
        `New follower on channel ${channel}: ${event.userDisplayName}`
      );
    });
  };
}

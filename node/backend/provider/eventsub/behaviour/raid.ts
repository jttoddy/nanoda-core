import { EventSubWsListener } from "@twurple/eventsub-ws";

const DEFAULT_CHANNEL = "nanoda_ch";

export interface RaidEventListeners {
  onRaid: (channel: string, event: any) => void;
}

export function createRaidListeners(
  ws: EventSubWsListener,
  channel: string = DEFAULT_CHANNEL
): (listeners: RaidEventListeners) => void {
  return (listeners: RaidEventListeners) => {
    ws.onChannelRaidTo(channel, (event) => {
      listeners.onRaid(channel, event);
    });
  };
}

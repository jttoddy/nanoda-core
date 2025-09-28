import { EventSubWsListener } from "@twurple/eventsub-ws";

export function createSubscriptionListeners(ws: EventSubWsListener) {
  ws.onSubscriptionCreateSuccess((sub) => {
    console.log("Subscription created:", sub);
  });
  ws.onSubscriptionCreateFailure((sub, error) => {
    console.error("Subscription failed:", sub, error);
  });

  ws.onSubscriptionDeleteSuccess((sub) => {
    console.log("Subscription deleted:", sub);
  });
  ws.onSubscriptionDeleteFailure((sub, error) => {
    console.error("Subscription delete failed:", sub, error);
  });
}

export function createRaidListeners(
  ws: EventSubWsListener,
  channel: string = "nanoda_ch",
  oomfiesCalled: string = "us"
) {
  ws.onChannelRaidTo(channel, (event) => {
    console.log(
      `${event.raidingBroadcasterDisplayName} is raiding ${oomfiesCalled} with ${event.viewers} viewers!`
    );
  });
}

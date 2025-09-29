import { EventSubWsListener } from "@twurple/eventsub-ws";

export interface SubscriptionEventListeners {
  onSubscriptionCreateSuccess: (event: any, subscription: any) => void;
  onSubscriptionCreateFailure: (sub: any, error: Error) => void;
  onSubscriptionDeleteSuccess: (sub: any) => void;
  onSubscriptionDeleteFailure: (sub: any, error: Error) => void;
}

export function createSubscriptionListeners(
  ws: EventSubWsListener
): (listeners: SubscriptionEventListeners) => void {
  return (listeners: SubscriptionEventListeners) => {
    ws.onSubscriptionCreateSuccess(listeners.onSubscriptionCreateSuccess);
    ws.onSubscriptionCreateFailure(listeners.onSubscriptionCreateFailure);
    ws.onSubscriptionDeleteSuccess(listeners.onSubscriptionDeleteSuccess);
    ws.onSubscriptionDeleteFailure(listeners.onSubscriptionDeleteFailure);
  };
}

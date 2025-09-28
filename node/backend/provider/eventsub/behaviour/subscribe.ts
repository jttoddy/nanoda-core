import { ApiClient } from "@twurple/api";
import { z } from "zod";

export enum EventSubRequestType {
  UserUpdate = "user.update",
  ChannelFollow = "channel.follow",
  ChannelSubscribe = "channel.subscribe",
}

export type EventSubRequest<EventSubRequestType> = {
  type: EventSubRequestType;
  version: string;
  condition: { user_id: string };
  transport: { method: "websocket"; session_id: string };
};

export type CreateEventSubRequest = {
  type: EventSubRequestType;
  userId: string;
  wsSessionId: string;
};

export function createEventSubRequest({
  type,
  userId,
  wsSessionId,
}: CreateEventSubRequest): EventSubRequest<EventSubRequestType> {
  return {
    type,
    version: "1",
    condition: {
      user_id: userId,
    },
    transport: {
      method: "websocket",
      session_id: wsSessionId,
    },
  } as EventSubRequest<EventSubRequestType>;
}

export const EventSubSubscriptionResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      status: z.string(),
      type: z.string(),
      version: z.string(),
      condition: z.object({ user_id: z.string() }).optional(),
      created_at: z.string(),
      transport: z
        .object({ method: z.string(), callback: z.string() })
        .optional(),
      cost: z.number(),
    })
  ),
  total: z.number(),
  total_cost: z.number(),
  max_total_cost: z.number(),
});

export type EventSubSubscriptionResponse = z.infer<
  typeof EventSubSubscriptionResponseSchema
>;

type CreatesEventSubscription = (
  request: EventSubRequest<EventSubRequestType>
) => Promise<EventSubSubscriptionResponse>;

export function createEventSubscription(
  api: ApiClient
): CreatesEventSubscription {
  return async (request) => {
    console.log("Creating event subscription:", request);
    const subscription = await api.eventSub.createSubscription(
      request.type,
      request.version,
      request.condition,
      {
        method: request.transport.method,
        session_id: request.transport.session_id,
      }
    );
    return EventSubSubscriptionResponseSchema.parse(subscription);
  };
}

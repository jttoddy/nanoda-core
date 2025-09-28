import { z } from "zod";

const WelcomeMessageSchema = z.object({
  metadata: z.object({
    message_id: z.string(),
    message_type: z.literal("session_welcome"),
    message_timestamp: z.string(),
  }),
  payload: z.object({
    session: z.object({
      id: z.string(),
      status: z.string(),
      connected_at: z.string(),
      keepalive_timeout_seconds: z.number(),
      reconnect_url: z.string().nullable(),
    }),
  }),
});

export interface WelcomeMessage {
  id: string;
  status: string;
  connectedAt: string;
  keepaliveTimeoutSeconds: number;
  reconnectUrl: string | null;
}

export function parseWelcomeMessage(message: unknown): WelcomeMessage {
  const parsed = WelcomeMessageSchema.parse(message);
  return {
    id: parsed.payload.session.id,
    status: parsed.payload.session.status,
    connectedAt: parsed.payload.session.connected_at,
    keepaliveTimeoutSeconds: parsed.payload.session.keepalive_timeout_seconds,
    reconnectUrl: parsed.payload.session.reconnect_url,
  };
}

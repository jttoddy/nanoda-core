import { z } from "zod";

/**
 * Parses a JSON message of type `session_welcome` and extracts relevant session information.
 *
 * The expected message format is:
 * {
 *   "metadata": {
 *     "message_id": string,
 *     "message_type": "session_welcome",
 *     "message_timestamp": string
 *   },
 *   "payload": {
 *     "session": {
 *       "id": string,
 *       "status": string,
 *       "connected_at": string,
 *       "keepalive_timeout_seconds": number,
 *       "reconnect_url": string | null
 *     }
 *   }
 * }
 *
 * @param message - The unknown input to be parsed and validated as a session welcome message.
 * @returns An object containing the session's id, status, connectedAt timestamp, keepaliveTimeoutSeconds, and reconnectUrl.
 * @throws {ZodError} If the input does not match the expected schema.
 */

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

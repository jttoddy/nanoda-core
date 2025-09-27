// Loads Twitch credentials from environment variables using dotenv
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || "";
export const TWITCH_CLIENT_TOKEN = process.env.TWITCH_CLIENT_TOKEN || "";
export const CALLBACK_URL = "http://localhost:3000/eventsub";

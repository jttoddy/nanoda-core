import axios from "axios";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "../config/twitch";

// Get Twitch App Access Token
export async function getTwitchAccessToken() {
  const resp = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  });
  return resp.data.access_token as string;
}

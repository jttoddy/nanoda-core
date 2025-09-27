import axios from "axios";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_TOKEN } from "../config/twitch";

export type OAuthTokenResponse = {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
};

// Get Twitch App Access Token
export async function getTwitchAccessToken() {
  console.log(`Requesting Twitch access token for ${TWITCH_CLIENT_ID}...`);
  const resp = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_TOKEN,
      grant_type: "client_credentials",
    },
  });
  const accessToken: OAuthTokenResponse = resp.data;
  return accessToken;
}

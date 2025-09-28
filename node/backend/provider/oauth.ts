import axios from "axios";
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_TOKEN } from "@config/twitch";
import logger from "@config/logger";

export interface OAuthTokenResponse {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  obtained_at?: number; // timestamp when token was obtained
}

export interface AutomaticallyRenewsOAuthToken {
  get: () => Promise<OAuthTokenResponse>;
}

export class TwitchTokenManager implements AutomaticallyRenewsOAuthToken {
  private cachedToken: OAuthTokenResponse | null = null;

  private isTokenExpired(token: OAuthTokenResponse | null): boolean {
    if (!token || !token.expires_in || !token.obtained_at) return true;
    const now = Date.now();
    return now > token.obtained_at + (token.expires_in - 60) * 1000;
  }

  async fetchToken(): Promise<OAuthTokenResponse> {
    logger.info(`Requesting Twitch access token for ${TWITCH_CLIENT_ID}...`);
    const resp = await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: {
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_TOKEN,
        grant_type: "client_credentials",
      },
    });
    return {
      ...resp.data,
      obtained_at: Date.now(),
    };
  }

  async get(): Promise<OAuthTokenResponse> {
    if (this.cachedToken && !this.isTokenExpired(this.cachedToken)) {
      return this.cachedToken;
    }
    this.cachedToken = await this.fetchToken();
    return this.cachedToken;
  }
}

// --- Twitch Chat via WebSockets (tmi.js) ---
import tmi from "tmi.js";

let tmiClient: tmi.Client | null = null;

export function connectTwitchChat(
  user: string = "nanoda_ch",
  channel: string = "nanoda_ch"
) {
  // Configure tmi.js client
  tmiClient = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true, secure: true },
    identity: {
      username: user, // Replace with your bot/username
      password: "oauth:your_oauth_token", // Get from https://twitchapps.com/tmi/
    },
    channels: [channel], // Replace with the channel you want to join
  });
  tmiClient.connect().catch(console.error);
  tmiClient.on(
    "message",
    (
      channel: string,
      tags: tmi.ChatUserstate,
      message: string,
      self: boolean
    ) => {
      if (self) return; // Ignore messages from the bot itself
      console.log(
        `[tmi.js] ${channel} <${tags["display-name"] || tags.username}>: ${message}`
      );
    }
  );
}

export function disconnectTwitchChat() {
  if (tmiClient) {
    tmiClient.disconnect().catch(console.error);
    tmiClient = null;
  }
}

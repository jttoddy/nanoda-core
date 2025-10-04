import readline from "readline";
import boxen from "boxen";
import { z, ZodError } from "zod";

const chatHistory: string[] = [];
const MAX_HISTORY = 10;

function render(chat: string[], input: string) {
  // Clear the console
  process.stdout.write("\x1Bc");
  // Render chat box
  const chatBox = boxen(chat.join("\n"), {
    title: " Chat ",
    padding: 1,
    margin: { top: 1, bottom: 0, left: 2, right: 2 },
    borderStyle: "round",
    borderColor: "cyan",
    fullscreen: (w, h) => {
      return [w, h - 16];
    },
  });
  // Render input box
  const inputBox = boxen(input, {
    title: " Message ",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
    margin: { top: 1, bottom: 0, left: 2, right: 2 },
    borderStyle: "round",
    borderColor: "magenta",
    fullscreen: (w, h) => {
      return [w, 16];
    },
  });
  console.log(chatBox);
  // console.log(inputBox);
}

export function createInterface() {
  let currentInput = "";
  render(chatHistory, currentInput);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
    terminal: true,
  });

  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  process.stdin.on("keypress", (str, key) => {
    if (key.name === "return") {
      if (currentInput.trim()) {
        chatHistory.push("> " + currentInput);
        if (chatHistory.length > MAX_HISTORY) chatHistory.shift();
      }
      currentInput = "";
      render(chatHistory, currentInput);
    } else if (key.name === "backspace") {
      currentInput = currentInput.slice(0, -1);
      render(chatHistory, currentInput);
    } else if (
      key.sequence &&
      key.sequence.length === 1 &&
      !key.ctrl &&
      !key.meta
    ) {
      currentInput += key.sequence;
      render(chatHistory, currentInput);
    } else if (key.ctrl && key.name === "c") {
      rl.close();
      process.exit();
    }
  });
}

export function addChatMessage(message: string) {
  chatHistory.push(message);
  if (chatHistory.length > MAX_HISTORY) chatHistory.shift();
  render(chatHistory, "");
}

// Subscribe to backend wss localhost:8080
const ws = new WebSocket("ws://localhost:8080");

// Zod schema for ChatMessage
export const ChatMessageSchema = z.object({
  event: z.literal("twitch.chat.message"),
  data: z.object({
    channel: z.string(),
    tags: z.record(z.string(), z.unknown()), // Accepts any object with string keys
    message: z.string(),
    self: z.boolean(),
  }),
});
let knownError: ZodError | null = null;
ws.onmessage = (event: MessageEvent<string>) => {
  try {
    const result = ChatMessageSchema.parse(
      event.data ? JSON.parse(event.data) : {}
    );
    const message = result.data;
    addChatMessage(
      `[${message.tags.displayName || "unknown"}] ${message.message}`
    );
  } catch {}
};

// Start the terminal chat interface
createInterface();

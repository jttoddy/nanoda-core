import readline from "readline";
import boxen from "boxen";

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
    width: 60,
    height: 16,
  });
  // Render input box
  const inputBox = boxen(input, {
    title: " Message ",
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
    margin: { top: 1, bottom: 0, left: 2, right: 2 },
    borderStyle: "round",
    borderColor: "magenta",
    width: 60,
  });
  console.log(chatBox);
  console.log(inputBox);
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

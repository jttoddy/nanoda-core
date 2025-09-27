import { ChatMessage } from "../provider/chat-webhook";

export function receiveMessage(msg: string, data: ChatMessage) {
  console.log(JSON.stringify({ msg, data }));
}

import React, { useEffect, useState } from "react";

type ChatMessage = {
  channel: string;
  tags: any;
  message: string;
  self: boolean;
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // Adjust port as needed
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "twitch.chat.message") {
        setMessages((msgs) => [...msgs, data.data]);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Twitch Chat</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <b>{msg.tags["display-name"] || msg.tags.username}:</b>{" "}
            {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

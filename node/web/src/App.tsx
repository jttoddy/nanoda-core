import React, { useEffect, useState, useRef } from "react";

type ChatMessage = {
  channel: string;
  tags: any;
  message: string;
  self: boolean;
};

import "./App.terminal.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    return connectAndStreamMessages(setMessages);
  }, []);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Placeholder for sending messages (not implemented)
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="terminal-container">
      <div className="terminal-window">
        <div className="terminal-header">{renderTwitchChatTitle()}</div>
        <div className="terminal-body">
          {renderChatMessageList(messages)}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="terminal-input-bar"
          onSubmit={handleSend}
          autoComplete="off"
        >
          <span className="prompt">$</span>
          <input
            className="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message... (not implemented)"
            disabled
          />
        </form>
      </div>
    </div>
  );
};

function connectAndStreamMessages(setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>) {
  const ws = new WebSocket("ws://localhost:8080"); // Adjust port as needed
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.event === "twitch.chat.message") {
      setMessages((msgs) => [...msgs, data.data]);
    }
  };
  return () => ws.close();
}

function renderChatMessageList(messages: ChatMessage[]): React.ReactNode {
  return messages.map((msg, i) => (
    <div
      className="terminal-line"
      key={`${msg.channel}-${msg.tags["id"] || msg.tags["tmi-sent-ts"] || i}`}
    >
      <span className="username">
        {msg.tags["display-name"] || msg.tags.username}:
      </span>{" "}
      <span className="message">{msg.message}</span>
    </div>
  ));
}

function renderTwitchChatTitle(
  value: string = "Twitch Chat Terminal"
): React.ReactNode {
  return value.split("").map((char, i) => (
    <span
      key={i}
      className="wave-char"
      style={{ "--animation-delay": `${i * 0.06}s` } as React.CSSProperties}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default App;

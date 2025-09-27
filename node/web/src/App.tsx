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
    const ws = new WebSocket("ws://localhost:8080"); // Adjust port as needed
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "twitch.chat.message") {
        setMessages((msgs) => [...msgs, data.data]);
      }
    };
    return () => ws.close();
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
        <div className="terminal-header">Twitch Chat Terminal</div>
        <div className="terminal-body">
          {messages.map((msg, i) => (
            <div className="terminal-line" key={i}>
              <span className="username">
                {msg.tags["display-name"] || msg.tags.username}:
              </span>{" "}
              <span className="message">{msg.message}</span>
            </div>
          ))}
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

export default App;

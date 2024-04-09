import { useEffect, useState } from "react";

import { socket } from "../socket";
import ChatInput from "./ChatInput";
import Message from "./Message";

type Message = {
  username: string;
  message: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const onMessage = (msg: Message) => setMessages((prev) => prev.concat(msg));

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, []);

  return (
    <div className="border rounded-md p-5 w-1/2 mx-auto flex flex-col">
      <h2 className="text-xl font-bold">Chat</h2>
      <ul className="font-mono p-4">
        {messages.map(({ username, message }, idx) => (
          <li key={idx}>
            <Message username={username} message={message} />
          </li>
        ))}
      </ul>
      <ChatInput />
    </div>
  );
}

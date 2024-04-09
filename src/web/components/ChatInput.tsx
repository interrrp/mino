import { FormEvent } from "react";

import { socket } from "../socket";

export default function ChatInput() {
  function send(ev: FormEvent) {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;

    const data = new FormData(form);
    const message = data.get("message");
    socket.emit("message", message);

    form.reset();
  }

  return (
    <form onSubmit={send} className="flex gap-2">
      <input name="message" placeholder="Send a message..." className="flex-1" />
      <button type="submit">Send</button>
    </form>
  );
}

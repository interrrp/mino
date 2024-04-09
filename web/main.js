import $ from "cash-dom";

const chatWs = new WebSocket(`ws://${window.location.host}/chat`);

chatWs.addEventListener("message", (ev) => {
  const li = $("<li></li>").text(ev.data);
  $("#chat-messages").append(li);
});

$("#chat-input").on("submit", (ev) => {
  ev.preventDefault();

  const data = new FormData(ev.target);
  const message = data.get("message");
  if (message) chatWs.send(message);

  $("#chat-input input[name='message']").val("");
});

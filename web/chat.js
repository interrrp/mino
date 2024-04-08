const chatWs = new WebSocket(`ws://${window.location.host}/chat`);

chatWs.addEventListener("message", (ev) => {
  const li = document.createElement("li");
  li.innerText = ev.data;
  document.querySelector("#chat-messages").appendChild(li);
});

/** @type {HTMLFormElement} */
const chatInput = document.querySelector("#chat-input");
chatInput.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const data = new FormData(chatInput);
  const message = data.get("message");
  if (message) chatWs.send(message);

  document.querySelector('#chat-input > input[name="message"]').value = "";
});
